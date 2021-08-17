const mongoose = require('mongoose');

let appointmentSchema = mongoose.Schema({
    scheduleId: {
        type: mongoose.ObjectId,
        ref: 'Slot'
    },
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
    patientName: {
        type: String
    },
    patientMobile: {
        type: Number
    },
    patientEmail:{
        type: String
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