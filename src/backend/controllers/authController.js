let User = require('./../models/UserModel');
let Doctor = require('./../models/DoctorModel');
let sessionLib = require('./../lib/assignSession');

let login = async (req, res) => {
    const { email, password } = req.body;
    let findEmail = await User.findOne({ email: email });
    if (!findEmail) {
        req.flash("fail", "Failure");
        req.flash("msg", "Invaild Email");
        return res.redirect('/login');
    }
    let checkPassword = await User.findOne({ email: email, password: password });
    if (checkPassword) {
        sessionLib.setSession(req, checkPassword);
        req.flash("head", "Success");
        req.flash("msg", "Login Successful");
        return res.redirect('/');
    } else {
        req.flash("fail", "Failure");
        req.flash("msg", "Invaild Password");
        return res.redirect('/login');
    }
}

let signup = async (req, res) => {
    const { name, email, password, gender, dob, mobile, city, state, country, isDoctor } = req.body;
    let newUser = new User({
        name: name,
        email: email,
        password: password,
        gender: gender,
        dob: dob,
        mobile: mobile,
        city: city,
        state: state,
        country: country,
        isDoctor: isDoctor
    })
    let registred = await newUser.save();
    if (registred) {
        sessionLib.setSession(req, registred);
        if (isDoctor === "yes") {
            return res.redirect('/details');
        } else {
            req.flash("head", "Success");
            req.flash("msg", "Signup Successful");
            return res.redirect('/');
        }
    } else {
        return res.redirect('/signup');
    }
}

let submitDetails = async (req, res) => {
    let { about, profile, hospital, acheivements, experience, qualification, awards, specialization, fees } = req.body;
    let docDetails = new Doctor({
        name : req.session.name,
        email: req.session.email,
        about: about,
        profile: profile,
        hospital: hospital,
        acheivements: acheivements,
        experience: experience,
        qualification: qualification,
        awards: awards,
        specialization: specialization,
        fees: fees,
        userId: req.session.userId
    })
    let submited = await docDetails.save();
    if (submited) {
        req.flash("head", "Success");
        req.flash("msg", "Signup Successful");
        res.redirect('/');
        return;
    } else {
        res.redirect('/submit_details');
    }
}

module.exports = {
    login: login,
    signup: signup,
    submitDetails: submitDetails
}