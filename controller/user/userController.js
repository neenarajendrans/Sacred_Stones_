const asyncHandler = require('express-async-handler');


//@des Get index page
//@route Get /
//@access  public

const getIndexPage = asyncHandler(async(req,res)=>{
    res.render('user/index');
});
//@des Get home page
//@route Get /
//@access  public

const getHomePage = asyncHandler(async(req,res)=>{
    res.render('user/home');
});
// //@des Get about page
// //@route Get /
// //@access  public

const getAboutPage = asyncHandler(async(req,res)=>{
    res.render('user/about');
});
// //@des Get contact page
// //@route Get /
// //@access  public

const getContactPage = asyncHandler(async(req,res)=>{
    res.render('user/contact');
});
// //@des Get Jewellery page
// //@route Get /
// //@access  public

const getJewelleryPage = asyncHandler(async(req,res)=>{
    res.render('user/jewellery');
});
// //@des Get  login page
// //@route Get /
// //@access  public

const getLoginPage = asyncHandler(async(req,res)=>{
    res.render('user/login');
});
// //@des Get signup page
// //@route Get /
// //@access  public

const getSignupPage = asyncHandler(async(req,res)=>{
    res.render('user/signup');
});
// //@des Get otp page
// //@route Get /
// //@access  public

const getOtpPage = asyncHandler(async(req,res)=>{
    res.render('user/otp');
});
// //@des Get index page
// //@route Get /
// //@access  public

// const getIndexPage = asyncHandler(async(req,res)=>{
//     res.render('user/index');
// });
// //@des Get index page
// //@route Get /
// //@access  public

// const getIndexPage = asyncHandler(async(req,res)=>{
//     res.render('user/index');
// });




module.exports = {getIndexPage,getHomePage,getAboutPage,getContactPage,getJewelleryPage,getLoginPage,getSignupPage,getOtpPage};