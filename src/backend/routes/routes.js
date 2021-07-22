const express = require('express');
const router = express.Router();

const testController = require('./../controllers/testController');
const renderController = require('../controllers/renderController');
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');
const sessionAuth = require('../controllers/sessionAuth');


router.route('/test').get(testController.test);
router.route('/testFlash').get(testController.testFlash);

router.route('/adduser').get(testController.addUser);
router.route('/users').get(testController.getUsers);



router.route('/login').get(renderController.renderLogin).post(authController.login);
router.route('/signup').get(renderController.renderSignUp).post(authController.signup);
router.route('/mobilelogin').get(renderController.renderMobileLogin);

router.route('/requestotp').post(otpController.otpRequest);
router.route('/verify').post(otpController.otpVerify);

router.route('/').get(sessionAuth.redirectlogin ,renderController.renderHome);










module.exports = router;