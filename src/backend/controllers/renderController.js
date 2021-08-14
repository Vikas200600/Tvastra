const Doctor = require('./../models/DoctorModel');
const Slot = require('./../models/SlotModel');

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

let renderAppointment = (req, res) => {
    res.render('appointments', {
        loggedIn: true,
        session: req.session
    });
}

let renderSchedule = async (req, res) => {
    console.log(`from renderSchedule: flash main = ${req.flash().head}`);
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
    let schedules = await Slot.find().select('-__v -interval');
    console.log(allDoctors);
    console.log("slots");
    console.log(schedules);
    let today = new Date();
    console.log(today);
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