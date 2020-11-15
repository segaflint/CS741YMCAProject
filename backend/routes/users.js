const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbconfig = require('../config/database');

const User = require('../database/models/user');

router.get('/', (req, res) => {
    User.getAllUsers((error, users) => {
        if (error) {
            console.log(error);
        } else {
            res.send(users);
        }
    });
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        isMember: false,
        isStaff: false
    });
    User.addUser(newUser, (error, user) => {
        if (error) {
            res.json({success: false, msg: "User registration failied"});
        } else {
            res.json({success: true, msg: "User registered"});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (error, user) => {
        if (error) throw error;
        if (!user) {
            return res.json({success: false, msg: "User not found"});
        }
        User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
                const token = jwt.sign({user}, dbconfig.secret, {
                    expiresIn: 3600 // 1 hour
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        isMember: user.isMember,
                        isStaff: user.isStaff
                    }
                });
            } else {
                return res.json({success: false, msg: "Wrong password"});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send(req.user);
});

router.delete('/:userId', (req, res) => {
    User.deleteUserById(req.params.userId, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            res.send(user);
        }
    });
});

module.exports = router;