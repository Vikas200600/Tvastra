const mongoose = require('mongoose');

const Appointment = require('./../models/appointmentModel');
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
        await Slot.findOneAndUpdate(
            {"subSlots._id": mongoose.Types.ObjectId(req.query.slotId)},
            { $set: { 'subSlots.$.isBooked': true }}
        );
        res.redirect('/confirm-booking');
    } else {
        res.redirect('/doctors')
    }
    // let selectedSlot = await Slot.find({})
}

module.exports = {
    bookAppointment: bookAppointment
}