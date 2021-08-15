const mongoose = require('mongoose');

let appointmentSchema = mongoose.Schema({
    slotId :{
        type: mongoose.ObjectId,
        ref: 'SubSlot'
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    doctorId: {
        type: mongoose.ObjectId,
        ref: 'Doctor'
    },
    appointmentDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Approved", "Cancelled", "Completed"],
        default: "Approved"
    }
}, {timestamps: true} )

module.exports = mongoose.model('appointment', appointmentSchema);