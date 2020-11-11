const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    programName: {
        type: String
    }
});

const Enrollment = module.exports = mongoose.model('Enrollment', EnrollmentSchema);

module.exports.getAllEnrollments = function(callback) {
    Enrollment.find({}, callback);
}

module.exports.getEnrollmentById = function(id, callback) {
    Enrollment.findById(id, callback);
}

module.exports.getEnrollmentByUserId = function(userId, callback) {
    Enrollment.find({userId: userId}, callback);
}

module.exports.createEnrollment = function(enrollment, callback) {
    (new Enrollment(enrollment)).save(undefined, callback);
}

// TODO: might not be needed
// module.exports.updateEnrollmentById = function(id, enrollment, callback) {
//     Enrollment.findByIdAndUpdate(id, { $set: enrollment }, callback);
// }

module.exports.deleteEnrollmentById = function(id, callback) {
    Enrollment.findByIdAndDelete(id, callback);
}