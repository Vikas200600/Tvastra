exports.setSession = (req,user) => {
    req.session.name = user.name;
    req.session.email = user.email;
    console.log(req.session);
}