/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Program model for database connections and transactions.
*/
const mongoose = require('mongoose');
const Registration = require('./registration');

const ProgramSchema = new mongoose.Schema({
    name: {
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
        type: Date
    },
    endTime: {
        type: Date
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

module.exports.getProgramConflicts = function(userId, programId, callback) {
    Program.findById(programId, (error, newProg) => {
        if (error) {
            callback(error, undefined);
        } else {
            Registration.getRegistrationsByUserId(userId, (error, registeredProgIds) => {
                if (error) {
                    callback(error, undefined);
                } else if (registeredProgIds) {
                    registeredProgIds = registeredProgIds.map(reg => reg.programId);
                    Program.find(
                    { "$and": [
                        { "_id" : { "$in" : registeredProgIds } },
                        { "$or": [
                            { "$and": [
                                { "startDate": { "$lte": newProg.endDate }},
                                { "endDate": { "$gte": newProg.endDate }}
                            ]},
                            { "$and": [
                                { "startDate": { "$lte": newProg.startDate }},
                                { "endDate": { "$gte": newProg.startDate }}
                            ]}
                        ]},
                        { "daysOfWeek": { "$in": newProg.daysOfWeek }},
                        { "$or": [
                            { "$and": [
                                { "startTime": { "$lte": newProg.endTime }},
                                { "endTime": { "$gte": newProg.endTime }}
                            ]},
                            { "$and": [
                                { "startTime": { "$lte": newProg.startTime }},
                                { "endTime": { "$gte": newProg.startTime }}
                            ]}
                        ]}
                    ]},
                    (error, conflicts) => {
                        callback(error, conflicts);
                    });
                } else {
                    callback(undefined, undefined);
                }
            });
        }
    });
}

module.exports.getProgramsByUserId = function(userId, callback) {
    Registration.getRegistrationsByUserId(userId, (error, registeredProgIds) => {
        if (error) {
            callback(error, undefined);
        } else if (registeredProgIds) {
            registeredProgIds = registeredProgIds.map(reg => reg.programId);
            Program.find({ "_id" : { "$in" : registeredProgIds }}, callback);
        } else {
            callback(undefined, undefined);
        }
    });
}

module.exports.createProgram = function(program, callback) {
    (new Program(program)).save(undefined, callback);
}

module.exports.updateProgramById = function(id, program, callback) {
    Program.findByIdAndUpdate(id, { $set: program }, callback);
}

module.exports.deleteProgramById = function(id, callback) {
    Registration.deleteRegistrationsByProgramId(id, (error, res) => {
        if (error) {
            callback(error, undefined);
        } else {
            Program.findByIdAndDelete(id, callback);
        }
    });
}