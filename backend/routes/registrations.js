/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Route definitions for the backend concerning registration transactions. This will communicate with the front end registration service.
*/
const express = require('express');
const router = express.Router();

const Registration = require('../database/models/registration');

router.get('/', (req, res) => {
    Registration.getAllRegistrations((error, registration) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registration);
        }
    });
});

router.get('/:registrationId', (req, res) => {
    Registration.getRegistrationById(req.params.registrationId, (error, registration) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registration);
        }
    });
});

router.get('/program/:programId', (req, res) => {
    Registration.getRegistrationsByProgramId(req.params.programId, (error, registrations) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registrations);
        }
    });
});

router.get('/user/:userId', (req, res) => {
    Registration.getRegistrationsByUserId(req.params.userId, (error, registrations) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registrations);
        }
    });
});

router.post('/', (req, res) => {
    Registration.createRegistration(req.body, (error, registration) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registration);
        }
    });
});

// TODO: might not be needed
// router.patch('/:registrationId', (req, res) => {
//     Registration.updateRegistrationById(req.params.registrationId, req.body, (error, registration) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.send(registration);
//         }
//     });
// });

router.delete('/:registrationId', (req, res) => {
    Registration.deleteRegistrationById(req.params.registrationId, (error, registration) => {
        if (error) {
            console.log(error);
        } else {
            res.send(registration);
        }
    });
});

module.exports = router;