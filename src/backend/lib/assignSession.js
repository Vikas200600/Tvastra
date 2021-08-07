exports.setSession = (req, user) => {
    if (!user.userId) {
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.mobile = user.mobile;
        req.session.gender = user.gender;
        req.session.dob = user.dob;
        req.session.city = user.city;
        req.session.state = user.state;
        req.session.isDoctor = user.isDoctor;
        req.session.userId = user._id;
        req.session.country = user.country;
    }
    if (user.userId) {
        req.session.about = user.about;
        req.session.hospital = user.hospital;
        req.session.achievements = user.achievements;
        req.session.experience = user.experience;
        req.session.qualification = user.qualification;
        req.session.awards = user.awards;
        req.session.specialization = user.specialization;
        req.session.fees = user.fees;
    }
}