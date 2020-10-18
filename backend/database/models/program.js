const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    price_member: {
        type: String
    },
    price_nonmember: {
        type: String
    },
    capacity: {
        type: String
    }
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