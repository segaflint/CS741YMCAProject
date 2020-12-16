/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Route definitions for the backend concerning program transactions. This will be called by the front end program service.
*/
const express = require('express');
const router = express.Router();

const Program = require('../database/models/program');

router.get('/', (req, res) => {
    Program.getAllPrograms((error, program) => {
        if (error) {
            console.log(error);
        } else {
            res.send(program);
        }
    });
});

router.get('/:programId', (req, res) => {
    Program.getProgramById(req.params.programId, (error, program) => {
        if (error) {
            console.log(error);
        } else {
            res.send(program);
        }
    });
});

router.get('/conflicts/:userId/:programId', (req, res) => {
    Program.getProgramConflicts(req.params.userId, req.params.programId, (error, programs) => {
        if (error) {
            console.log(error);
        } else {
            res.send(programs);
        }
    });
});

router.get('/user/:userId/', (req, res) => {
    Program.getProgramsByUserId(req.params.userId, (error, programs) => {
        if (error) {
            console.log(error);
        } else {
            res.send(programs);
        }
    });
});

router.post('/', (req, res) => {
    Program.createProgram(req.body, (error, program) => {
        if (error) {
            console.log(error);
        } else {
            res.send(program);
        }
    });
});

router.patch('/:programId', (req, res) => {
    Program.updateProgramById(req.params.programId, req.body, (error, program) => {
        if (error) {
            console.log(error);
        } else {
            res.send(program);
        }
    });
});

router.delete('/:programId', (req, res) => {
    Program.deleteProgramById(req.params.programId, (error, program) => {
        if (error) {
            console.log(error);
        } else {
            res.send(program);
        }
    });
});

module.exports = router;