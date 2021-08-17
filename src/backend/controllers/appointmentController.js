const mongoose = require('mongoose');

const Appointment = require('../models/AppointmentModel');
const Slot = require('./../models/SlotModel');

let bookAppointment = async (req, res) => {
    console.log(req.query);
    console.log(req.params);
    let newAppointment = await Appointment.create({
        slotId: req.query.slotId,
        userId: req.query.userId,
        doctorId: req.params.doctorId,
        appointmentDate: req.date
    });
    if(newAppointment) {
        let updated = await Slot.findOneAndUpdate(
            {"subSlots._id": mongoose.Types.ObjectId(req.query.slotId)},
            { $set: { 'subSlots.$.isBooked': true }}
        );
        console.log(updated);
        res.redirect('/doctors');
    } else {
        res.redirect('/home');
    }
}

module.exports = {
    bookAppointment: bookAppointment
}