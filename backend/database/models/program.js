const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    daysOfWeek: [{
        type: String
    }],
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    location: {
        type: String
    },
    memberPrice: {
        type: Number
    },
    nonMemberPrice: {
        type: Number
    },
    capacity: {
        type: Number
    },
    preRequisites: [{
        type: String
    }]
});

const Program = module.exports = mongoose.model('Program', ProgramSchema);

module.exports.getAllPrograms = function(callback) {
    Program.find({}, callback);
}

module.exports.getProgramById = function(id, callback) {
    Program.findById(id, callback);
}

module.exports.createProgram = function(program, callback) {
    (new Program(program)).save(undefined, callback);
}

module.exports.updateProgramById = function(id, program, callback) {
    Program.findByIdAndUpdate(id, { $set: program }, callback);
}

module.exports.deleteProgramById = function(id, callback) {
    Program.findByIdAndDelete(id, callback);
}