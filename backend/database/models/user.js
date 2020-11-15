const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Registration = require('./registration');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isMember: {
        type: Boolean
    },
    isStaff: {
        type: Boolean
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    User.findOne({username: username}, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (error, isMatch) => {
        if (error) throw error;
        callback(null, isMatch);
    });
}

module.exports.deleteUserById = function(id, callback) {
    Registration.deleteRegistrationsByUserId(id, (error, res) => {
        if (error) {
            callback(error, undefined);
        } else {
            User.findByIdAndDelete(id, callback);
        }
    });
}