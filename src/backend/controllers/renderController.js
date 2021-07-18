let renderLogin = (req, res) => {
    res.render('login',{
        flash : req.flash()
    });
}

let renderSignUp = (req, res) => {
    res.render('signUp');
}

let renderHome = (req, res) =>{
    res.render('index',{
        flash : req.flash()
    });
}



module.exports = {
    renderLogin : renderLogin,
    renderSignUp : renderSignUp,
    renderHome : renderHome
}