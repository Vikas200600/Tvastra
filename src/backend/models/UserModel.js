const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,   
    },
    password : {
        type : String,
        required : true 
    },
    gender : {
        type : String,
        required : true
    },
    dob : {
        type: String,
        required: true
    },
    mobile : {
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    isDoctor : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model('user',userSchema);
