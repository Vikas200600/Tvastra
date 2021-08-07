let Doctor = require('./../models/DoctorModel');
let User = require('./../models/UserModel');

let sessionLib = require('./../lib/assignSession');

exports.editProfile = async (req, res) => {
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

