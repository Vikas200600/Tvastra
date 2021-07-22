exports.redirectlogin=(req,res,next)=>{    
    if(!req.session.name){
        req.flash("head","Failure");
        req.flash("msg","Login Required First");
        return res.redirect("/login");
    }
    else{
        next();
    }
}