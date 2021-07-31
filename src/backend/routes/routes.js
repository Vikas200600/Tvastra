const express = require('express');
const router = express.Router();

const testController = require('./../controllers/testController');
const renderController = require('../controllers/renderController');
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');
const sessionAuth = require('../controllers/sessionAuth');


router.route('/test').get(testController.test);
router.route('/testFlash').get(testController.testFlash);
router.route('/temp').get(testController.tempRoute);

router.route('/adduser').get(testController.addUser);
router.route('/users').get(testController.getUsers);

router.route('/login').get(renderController.renderLogin).post(authController.login);
router.route('/signup').get(renderController.renderSignUp).post(authController.signup);
router.route('/details').get(renderController.renderDetails);
router.route('/submit_details').post(authController.submitDetails);
router.route('/mobilelogin').get(renderController.renderMobileLogin);

//dashboard routes
router.route('/profile').get(sessionAuth.redirectlogin, renderController.renderProfile);
router.route('/dashboard_appointments').get(sessionAuth.redirectlogin, renderController.renderAppointment);
router.route('/add-schedule').get(sessionAuth.redirectlogin, renderController.renderSchedule);
router.route('/settings').get(sessionAuth.redirectlogin, renderController.renderSettings);



router.route('/requestotp').post(otpController.otpRequest);
router.route('/verify').post(otpController.otpVerify);

router.route('/').get(sessionAuth.redirectlogin, renderController.renderHome);
router.route('/doctors').get(sessionAuth.redirectlogin, renderController.renderDoctor);
router.route('/hospitals').get(sessionAuth.redirectlogin, renderController.renderHospital);
router.route('/treatments').get(sessionAuth.redirectlogin, renderController.renderTreatment);
router.route('/about').get(renderController.renderAbout);
router.route('/faq').get(renderController.renderFaq);
router.route('/Plus').get(renderController.renderPlus);

module.exports = router;