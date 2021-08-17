const Doctor = require('./../models/DoctorModel');
const Slot = require('./../models/SlotModel');
const Appointment = require('../models/AppointmentModel');

let renderLogin = (req, res) => {
    res.render('login', {
        flash: req.flash(),
        loggedIn: null,
        session: null
    });
}

let renderMobileLogin = (req, res) => {
    res.render('mobileLogin', {
        flash: req.flash(),
        loggedIn: null,
        session: null
    });
}

let renderSignUp = (req, res) => {
    res.render('signUp', {
        flash: req.flash(),
        loggedIn: null,
        session: null
    });
}

let renderDetails = (req, res) => {
    res.render('docProfile', {
        flash: req.flash(),
        loggedIn: null
    });
}

let renderHome = (req, res) => {
    res.render('index', {
        flash: req.flash(),
        loggedIn: true,
        session: req.session
    });
}


let renderProfile = (req, res) => {
    console.log("from render profile:")
    console.log(req.session);
    res.render('profile', {
        loggedIn: true,
        session: req.session
    });
}

let renderAppointment = async (req, res) => {
    let allAppointments = await Appointment.find({ userId: req.session.userId });
    console.log(allAppointments);
    res.render('appointments', {
        loggedIn: true,
        session: req.session,
        allAppointments: allAppointments
    });
}

let renderSchedule = async (req, res) => {
    console.log(`from renderSchedule: flash main = ${req.flash().head}`);
    console.log(`from renderSchedule: flash main = ${req.flash().fail}`);
    let scheduledSlots = await Slot.find({ doctorId: req.session.userId }).select('-__v -name -email -interval -doctorId');
    res.render('addSchedule', {
        flash: req.flash(),
        loggedIn: true,
        session: req.session,
        slots: scheduledSlots
    });
}

let renderSettings = (req, res) => {
    res.render('settings', {
        flash: req.flash(),
        loggedIn: true,
        session: req.session
    });
}

let renderDoctor = async (req, res) => {
    let allDoctors = await Doctor.find().select('-__v -id -email -about');
    let schedules = await Slot.find(
        { "subSlots.isBooked": false}
    ).select('-__v -interval');
    let today = new Date();
    res.render('doctor', {
        loggedIn: true,
        session: req.session,
        allDoctors: allDoctors,
        allSlots: schedules,
        currentDay: new Date().getDay(),
        today: today
    });
}

let renderHospital = (req, res) => {
    res.render('hospital', {
        loggedIn: true,
        session: req.session
    });
}

let renderTreatment = (req, res) => {
    res.render('aboutTreatment', {
        loggedIn: true,
        session: req.session
    });
}

let renderPlus = (req, res) => {
    res.render('tvastraPlus', {
        loggedIn: true,
        session: req.session
    });
}


let renderAbout = (req, res) => {
    req.session ? res.render('aboutUs', { loggedIn: true, session: req.session }) : res.render('aboutUs', { loggedIn: false, session: null });
}

let renderFaq = (req, res) => {
    req.session ? res.render('faq', { loggedIn: true, session: req.session }) : res.render('faq', { loggedIn: false, session: null });
}




module.exports = {
    renderLogin: renderLogin,
    renderMobileLogin: renderMobileLogin,
    renderSignUp: renderSignUp,
    renderDetails: renderDetails,
    renderHome: renderHome,
    renderProfile: renderProfile,
    renderAppointment: renderAppointment,
    renderSchedule: renderSchedule,
    renderSettings: renderSettings,
    renderDoctor: renderDoctor,
    renderHospital: renderHospital,
    renderTreatment: renderTreatment,
    renderPlus: renderPlus,
    renderAbout: renderAbout,
    renderFaq: renderFaq
}