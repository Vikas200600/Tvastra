const Appointment = require('./../models/appointmentModel');
const Slot = require('./../models/SlotModel');

let bookAppointment = async (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.redirect('/');
}

module.exports = {
    bookAppointment: bookAppointment
}