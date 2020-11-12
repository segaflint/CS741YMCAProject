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

module.exports.getProgramConflicts = function(userId, programId, callback) {
    Program.findById(programId, (error, newProg) => {
        if (error) {
            callback(error, undefined);
        } else {
            Registration.find({userId: userId}, (error, registeredProgIds => {
                if (error) {
                    callback(error, undefined);
                } else {
                    if (registeredProgIds) {
                        registeredProgIds = registeredProgIds.map(reg => reg.userId);
                        Program.find({ "$and": [
                            { "_id" : { "$in" : registeredProgIds } },
                            { "$or": [
                                { "$and": [
                                    { "startDate": { "$lt": newProg.endDate }},
                                    { "endDate": { "$gt": newProg.endDate }}
                                ]},
                                { "$and": [
                                    { "startDate": { "$lt": newProg.startDate }},
                                    { "endDate": { "$gt": newProg.startDate }}
                                ]}
                            ]},
                            { "daysOfWeek": { "$in": newProg.daysOfWeek }}
                        ]},
                        (error, possibleConficts) => {
                            if (error) {
                                callback(error, undefined);
                            } else {
                                let conflicts = possibleConficts
                                // .filter(possibleConflict => {
                                //     if (possibleConflict.startTime) {
    
                                //     }
                                // })
                                ;
                                callback(undefined, conflicts);
                            }
                        });
                    } else {
                        callback(undefined, undefined);
                    }
                }
            }))
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
    Program.findByIdAndDelete(id, callback);
}