const mongoose = require('mongoose');

let doctorSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    profile : {
        type : String
    },
    hospital : {
        type : String,
        required : true
    },
    acheivements : {
        type : String,
    },
    experience : {
        type : String,
        required : true
    },
    qualification : {
        type : String,
        required : true
    },
    awards : {
        type : String,
    },
    specialization : {
        type : String,
        required : true
    },
    fees : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('doctor',doctorSchema);