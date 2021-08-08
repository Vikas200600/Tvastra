let Doctor = require('./../models/DoctorModel');
let User = require('./../models/UserModel');

let sessionLib = require('./../lib/assignSession');

let editProfile = async (req, res) => {
    let userFilter = { _id: req.session.userId };
    let userUpdate = {
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
    };
    let isUpdated = await User.updateOne(userFilter, userUpdate);
    let updatedUser = await User.findOne(userFilter);
    sessionLib.setSession(req, updatedUser);
    if (req.session.isDoctor) {
        let filter = { userId: req.session.userId };
        let docDetailsUpdate = {
            name: req.body.name,
            about: req.body.about,
            hospital: req.body.hospital,
            achievements: req.body.achievements,
            qualification: req.body.qualification,
            awards: req.body.awards,
            specialization: req.body.specialization,
            country: req.body.country
        };
        let isUpdated = await Doctor.updateOne(filter, docDetailsUpdate);
        let updatedUser = await Doctor.findOne(filter);
        sessionLib.setSession(req, updatedUser);
    }
    return res.redirect('/profile');
}

let changePassword = async (req, res) => {
    let {curPassword, newPassword, conPassword} = req.body;
    let user = await User.findOne({ _id: req.session.userId });
    if(user) {
        if(curPassword !== user.password) {
            req.flash("fail","Failure");
            req.flash("msg", "Invalid Password");
            return res.redirect('/settings');
        } else {
            if(newPassword !== conPassword) {
                req.flash("info", "Failure");
                req.flash("msg", "Passwords Doesn't Match");
                return res.redirect('/settings');
            }
            user.password = newPassword;
            let isChanged = await user.save();
            if(isChanged) {
                req.flash("head", "Success");
                req.flash("msg", "Password Changed");
                return res.redirect('/settings'); 
            } else {
                req.flash("fail", "Failure");
                req.flash("msg", "Try Again Later");
                return res.redirect('/settings');
            }
        }
    }
}

let logout = (req, res) => {
    req.session.destroy(() => {
        req.flash("head", "Success");
        req.flash("msg", "Logged out Sucessfully");
        return res.redirect('/login'); 
    })
}

module.exports = {
    editProfile: editProfile,
    changePassword: changePassword,
    logout: logout
}