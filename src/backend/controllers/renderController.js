let renderLogin = (req, res) => {
    res.render('login',{
        flash : req.flash(),
        loggedIn : null
    });
}

let renderMobileLogin = (req, res) => {
    res.render('mobileLogin',{
        flash : req.flash(),
        loggedIn : null
    });
}

let renderSignUp = (req, res) => {
    res.render('signUp',{
        flash : req.flash(),
        loggedIn : null
    });
}

let renderDetails = (req, res) => {
    res.render('docProfile',{
        loggedIn : null
    });
}

let renderHome = (req, res) =>{
    res.render('index',{
        flash : req.flash(),
        loggedIn : true
    });
}

let renderDoctor = (req, res) => {
    res.render('doctor',{
        loggedIn : true
    });
}

let renderHospital = (req, res) => {
    res.render('hospital',{
        loggedIn : true
    });
}

let renderTreatment = (req, res) => {
    res.render('aboutTreatment',{
        loggedIn : true
    });
}

let renderPlus = (req, res) => {
    res.render('tvastraPlus',{
        loggedIn : true
    });
}

let renderAbout = (req, res) => {
    req.session.name ? res.render('aboutUs',{ loggedIn : true }) : res.render('aboutUs', { loggedIn :false});
}

let renderFaq = (req, res) => {
    req.session.name ? res.render('faq',{ loggedIn : true }) : res.render('faq', { loggedIn : false });
}




module.exports = {
    renderLogin : renderLogin,
    renderMobileLogin : renderMobileLogin,
    renderSignUp : renderSignUp,
    renderDetails : renderDetails, 
    renderHome : renderHome,
    renderDoctor : renderDoctor,
    renderHospital : renderHospital,
    renderTreatment : renderTreatment,
    renderPlus : renderPlus,
    renderAbout : renderAbout,
    renderFaq : renderFaq
}