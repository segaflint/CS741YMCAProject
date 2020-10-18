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