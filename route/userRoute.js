const express = require('express');
const userRoute = express.Router();
const userController = require('../controller/user/userController');
const { isLoggedin } = require('../middleware/userAuth');

userRoute.get('/', userController.getIndexPage);
userRoute.get('/home', isLoggedin, userController.getHomePage);
userRoute.get('/about', isLoggedin, userController.getAboutPage);
userRoute.get('/contact', isLoggedin, userController.getContactPage);
userRoute.get('/jewellery', isLoggedin, userController.getJewelleryPage);
userRoute.get('/login', userController.getLoginPage);
userRoute.get('/signup', userController.getSignupPage);
userRoute.get('/otp', userController.getOtpPage);
userRoute.get('/productdetail', userController.getProductDetailPage);
userRoute.post('/otp', userController.verifyOtp);
userRoute.post('/signup', userController.registerUser);
userRoute.post('/login', userController.verifyUser);
userRoute.get('/logout', userController.logout);
userRoute.get('/resend', userController.resendOtp);

module.exports = userRoute;
