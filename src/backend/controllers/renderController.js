const Doctor = require('./../models/DoctorModel');

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

let renderSchedule = (req, res) => {
    res.render('addSchedule', {
        loggedIn: true,
        session: req.session
    });
}

let renderDoctor = async (req, res) => {
    let allDoctors = await Doctor.find();
    res.render('doctor', {
        loggedIn: true,
        session: req.session,
        allDoctors: allDoctors
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
    renderDoctor: renderDoctor,
    renderHospital: renderHospital,
    renderTreatment: renderTreatment,
    renderPlus: renderPlus,
    renderAbout: renderAbout,
    renderFaq: renderFaq
}