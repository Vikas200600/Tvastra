let User = require('../models/UserModel');

let test = (req, res) => {
    res.json({
        error: "none",
        message: "Server Test Success",
        status: 200,
        data :null
    })
};

let tempRoute = (req, res) => {
    res.render('docProfile',{
        loggedIn : "flase"
    });
}

let testFlash = (req, res) => {
    req.flash("head","welcome");
    req.flash("msg","welcome");
    return res.send(req.flash());
}


let addUser = (req, res) => {
    let newUser = new User();
    newUser.save((err) => {
        if(err) {
            res.json({
                error: err,
                message: "User not Added",
                status: 404,
            });            
        } else {
            console.log("User Added");
            res.json({
                error: "none",
                message: "User Added",
                status: 200,
            });
        }
    });
}

let getUsers = (req, res) => {
    User.find((err, result) => {
        res.json(result);
    })
}


module.exports = {
    test : test,
    addUser : addUser,
    getUsers : getUsers,
    testFlash : testFlash,
    tempRoute : tempRoute
}