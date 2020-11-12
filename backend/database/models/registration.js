const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
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

const Registration = module.exports = mongoose.model('Registration', RegistrationSchema);

module.exports.getAllRegistrations = function(callback) {
    Registration.find({}, callback);
}

module.exports.getRegistrationById = function(id, callback) {
    Registration.findById(id, callback);
}

module.exports.getRegistrationsByProgramId = function(programId, callback) {
    Registration.find({programId: programId}, callback);
}

module.exports.getRegistrationsByUserId = function(userId, callback) {
    Registration.find({userId: userId}, callback);
}

module.exports.createRegistration = function(registration, callback) {
    (new Registration(registration)).save(undefined, callback);
}

// TODO: might not be needed
// module.exports.updateRegistrationById = function(id, registration, callback) {
//     Registration.findByIdAndUpdate(id, { $set: registration }, callback);
// }

module.exports.deleteRegistrationById = function(id, callback) {
    Registration.findByIdAndDelete(id, callback);
}