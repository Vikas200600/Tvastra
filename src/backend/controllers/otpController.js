const User = require('./../models/UserModel');
const sessionLib = require('./../lib/assignSession');
// const Vonage = require('@vonage/server-sdk');

const vonage = null;  //disconnection from api

exports.otpRequest = async (req, res) => {
  let mobileNumber = "91" + req.body.phone;
  if (vonage) {
    let userCheck = await User.findOne({ mobile: req.body.phone });
    if (userCheck) {
      vonage.verify.request({
        number: mobileNumber,
        brand: "Tvastra"
      }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          sessionLib.setSession(req, userCheck);
          req.session.verifyRequestId = result.request_id;
          req.flash("info", "OTP Sent");
          req.flash("msg", "Valid For 30 mins")
          res.render('enterOtp');
        }
      });
    } else {
      req.flash("fail", "Invalid Mobile");
      req.flash("msg", "Signup First");
      res.redirect("/mobilelogin");
    }
  } else {
    req.flash("info", "Unable To Process");
    req.flash("msg", "Login With Password");
    res.redirect("/mobilelogin");
  }
}

exports.otpVerify = (req, res) => {
  let { d1, d2, d3, d4 } = req.body;
  let otp = d1 * 1000 + d2 * 100 + d3 * 10 + d4 * 1;
  vonage.verify.check({
    request_id: req.session.verifyRequestId,
    code: otp
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      req.flash("head", "Welcome");
      req.flash("msg", "Login Successful");
      res.redirect('/');
    }
  });
}

