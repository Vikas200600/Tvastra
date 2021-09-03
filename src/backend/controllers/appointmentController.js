const mongoose = require('mongoose');

const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel')
const Slot = require('../models/SlotModel');
const SubSlot = require('../models/SubSlotModel').SubSlot;

let bookAppointment = async (req, res) => {
    let doctor = await Doctor.findOne({'userId': req.params.doctorId}).select('-_id name qualification specialization hospital country');
    let slot = await SubSlot.findOne({'_id': req.query.slotId}).select('startTime');
    req.session.newAppointment = {
        scheduleId: req.query.scheduleId,
        slotId: req.query.slotId,
        userId: req.query.userId,
        doctorId: req.params.doctorId,
        appointmentDate: new Date(req.query.date),
        doctorDetails: {
            name: doctor.name,
            qualification: doctor.qualification,
            specialization: doctor.specialization
        },
        slotDetails: {
            hospital: doctor.hospital,
            location: doctor.country,
            slotTime: slot.startTime
        }
    };
    res.redirect('/confirm-appointment');
}

let confirmBooking = async (req, res, next) => {
    console.log(req.session);
    let newAppointment = req.session.newAppointment;
    let booked = await Appointment.create({
        scheduleId: newAppointment.scheduleId,
        slotId: newAppointment.slotId,
        userId: newAppointment.userId,
        doctorId: newAppointment.doctorId,
        appointmentDate: newAppointment.appointmentDate,
        patientName: req.body.patientName,
        patientMobile: req.body.patientMobile,
        patientEmail: req.body.patientEmail,
        doctorName: newAppointment.doctorDetails.name,
        hospitalName: newAppointment.slotDetails.hospital,
        startTime: newAppointment.slotDetails.slotTime
    })    
    if(booked) {
        req.session.newAppointment.id = booked._id;
        req.session.newAppointment.patientDetails = {
            patientName : booked.patientName,
            patientMobile: booked.patientMobile,
            patientEmail: booked.patientEmail 
        }
        console.log(booked);
        let changedBooked = await Slot.findOneAndUpdate(
            {"subSlots._id": mongoose.Types.ObjectId(newAppointment.slotId)},
            { $set: { 'subSlots.$.isBooked': true }}
        );
        res.redirect('/appointment-confirmed');
    } else {
        res.redirect('/doctors');
    }
    next();
}

let rescheduleAppointment = async (req, res) => {
    let prevSlotId = await Appointment.findOne({_id: req.params.appointmentId}).select('slotId');
    console.log(`beginning: ${prevSlotId}`);
    SubSlot.find({_id: req.query.slotId}).select('startTime').exec().then(async (data) => {
        let updatedSchedule = {
            slotId: req.query.slotId,
            appointmentDate: req.query.date,
            startTime: data[0].startTime
        }        
        console.log(updatedSchedule);
        await Appointment.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.appointmentId)}, updatedSchedule);
        await Slot.findOneAndUpdate(
            {"subSlots._id": mongoose.Types.ObjectId(req.query.slotId)},
            { $set: { 'subSlots.$.isBooked': true }}
        );
        await Slot.findOneAndUpdate(
            {"subSlots._id": mongoose.Types.ObjectId(prevSlotId.slotId)}, 
            { $set: { 'subSlots.$.isBooked': false }}
        );
    })
    res.redirect('/dashboard-appointments');
}

let cancelAppointment = async (req, res) => {
    Appointment.findOne({_id: mongoose.Types.ObjectId(req.params.appointmentId)}).exec().then(async (appointment) => {
        await Slot.findOneAndUpdate(
            {"subSlots._id": appointment.slotId}, 
            { $set: { 'subSlots.$.isBooked': false }}
        );
        await Appointment.deleteOne({_id: mongoose.Types.ObjectId(appointment._id)});
    })    
    res.redirect('/dashboard-appointments');
}

module.exports = {
    bookAppointment: bookAppointment,
    confirmBooking: confirmBooking,
    rescheduleAppointment: rescheduleAppointment,
    cancelAppointment: cancelAppointment
}