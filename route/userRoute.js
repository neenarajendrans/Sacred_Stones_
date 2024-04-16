const express = require('express');
const userRoute = express.Router();
const userController = require('../controller/user/userController')


userRoute.get('/',userController.getIndexPage);
userRoute.get('/home',userController.getHomePage);
userRoute.get('/about',userController.getAboutPage);
userRoute.get('/contact',userController.getContactPage);
userRoute.get('/jewellery',userController.getJewelleryPage);
userRoute.get('/login',userController.getLoginPage);
userRoute.get('/signup',userController.getSignupPage);
userRoute.get('/otp',userController.getOtpPage);

module.exports =  userRoute;