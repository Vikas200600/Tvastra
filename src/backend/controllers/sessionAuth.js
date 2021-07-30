const Doctor = require('./../models/DoctorModel');

exports.redirectlogin= async (req,res,next)=>{  
    if(req.session.isDoctor === "yes") {
        let filled = await Doctor.findOne({userId : req.session.userId});
        if(!filled){
            req.flash("info","Last Step");
            req.flash("msg","Complete Your Profile");
            return res.redirect('/details');
        } 
    }
    if(!req.session.userId ){
        req.flash("head","Failure");
        req.flash("msg","Login Required First");
        return res.redirect("/login");
    }
    else{
        next();
    }
}