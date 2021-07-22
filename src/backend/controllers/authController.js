let User = require('./../models/UserModel');
let sessionLib = require('./../lib/assignSession');

let login = async (req, res) => {
    const {email, password} = req.body;
    let findEmail = await User.findOne({email : email});
    if(!findEmail) {  
        req.flash("fail","Failure");
        req.flash("msg","Invaild Email");
        return res.redirect('/login');
    }
    let checkPassword = await User.findOne({email : email , password : password});
    if(checkPassword) {
        sessionLib.setSession(req,checkPassword);
        req.flash("head","Success");
        req.flash("msg","Login Successful");
        return res.redirect('/'); 
    } else {       
        req.flash("fail","Failure");
        req.flash("msg","Invaild Password");
        return res.redirect('/login');
    }      
}

let signup = async (req, res) => {
    const {name, email, password, gender, dob, mobile, city, state, country} = req.body;
    let newUser = new User({
        name : name,
        email : email,
        password : password,
        gender : gender,
        dob : dob,
        mobile : mobile,
        city : city,
        state : state,
        country : country
    })
    let registred = await newUser.save();
    if(registred){
        sessionLib.setSession(req,registred);
        req.flash("head","Success");
        req.flash("msg","Signup Successful");
        res.redirect('/');
    } else {
        res.redirect('/signup');
    }
}

module.exports = {
    login : login,
    signup : signup
}