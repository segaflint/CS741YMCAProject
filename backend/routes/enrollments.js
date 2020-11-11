const express = require('express');
const router = express.Router();

const Enrollment = require('../database/models/enrollment');

router.get('/', (req, res) => {
    Enrollment.getAllEnrollments((error, enrollment) => {
        if (error) {
            console.log(error);
        } else {
            res.send(enrollment);
        }
    });
});

router.get('/:enrollmentId', (req, res) => {
    Enrollment.getEnrollmentById(req.params.enrollmentId, (error, enrollment) => {
        if (error) {
            console.log(error);
        } else {
            res.send(enrollment);
        }
    });
});

router.get('/:userId', (req, res) => {
    Enrollment.getEnrollmentsByUserId(req.params.userId, (error, enrollments) => {
        if (error) {
            console.log(error);
        } else {
            res.send(enrollments);
        }
    });
});

router.post('/', (req, res) => {
    Enrollment.createEnrollment(req.body, (error, enrollment) => {
        if (error) {
            console.log(error);
        } else {
            res.send(enrollment);
        }
    });
});

// TODO: might not be needed
// router.patch('/:enrollmentId', (req, res) => {
//     Enrollment.updateEnrollmentById(req.params.enrollmentId, req.body, (error, enrollment) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.send(enrollment);
//         }
//     });
// });

router.delete('/:enrollmentId', (req, res) => {
    Enrollment.deleteEnrollmentById(req.params.enrollmentId, (error, enrollment) => {
        if (error) {
            console.log(error);
        } else {
            res.send(enrollment);
        }
    });
});

module.exports = router;