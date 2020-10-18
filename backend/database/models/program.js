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

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;