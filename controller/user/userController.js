const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const message = require("../../config/mailer");

const securePassword = asyncHandler(async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
});

//@des Get index page
//@route Get /
//@access  public

const getIndexPage = asyncHandler(async (req, res) => {
  res.render("user/index");
});
// //@des Get signup page
// //@route Get /signup
// //@access  public

const getSignupPage = asyncHandler(async (req, res) => {
  res.render("user/signup");
});
//@des Post Signup / Register User
//@route Post /signup
//@access  public

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { fullName, email, phoneNumber, password } = req.body;
  const existMail = await User.findOne({ email: email });
  if (existMail) {
    return res.render("user/login", {
      message: "This user already exists",
    });
  } else {
    req.session.userData = req.body;
    req.session.regiser = 1;
    req.session.email = email;
    if (req.session.email) {
      const data = await message.sendVarifyMail(req, req.session.email);
      res.redirect("/otp");
    }
  }

  // const hashedPassword = await bcrypt.hash(password,10);
  // const user = new User({ fullName, email, phoneNumber, password:hashedPassword });
  // await user.save();
  // res.render("user/login")
  // console.log(user);
});
//@des Get otp page
//@route Get /otp
//@access  public

const getOtpPage = asyncHandler(async (req, res) => {
  res.render("user/otp");
});

//@des verify OTP
//@route post /otp
//@access  public

const verifyOtp = asyncHandler(async (req, res) => {
  const userData = req.session.userData;
  const firstDigit = req.body.first;
  const secondDigit = req.body.second;
  const thirdDigit = req.body.third;
  const fourthDigit = req.body.fourth;
  const fullOTP = firstDigit + secondDigit + thirdDigit + fourthDigit;

  console.log({userData,firstDigit,secondDigit,thirdDigit,fourthDigit,fullOTP,sessionOTP:req.session.otp})

  if (!req.session.user_id) {
    if (req.body.otp == req.session.otp) {
      console.log("elon ma")
      const secure_password = await securePassword(userData.password);
      const user = new User({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: secure_password,
      });

      const userDataSave = await user.save();
      if (userDataSave && userDataSave.isAdmin === false) {
        req.session.user_id = userDataSave._id;
        res.redirect("/home");
      } else {
        return res.render("user/otp", { message: "Registration Failed" });
      }
    } else {
      return res.render("user/otp", {
        message: "invailid otp. Please enter the correct OTP.",
      });
    }
  } else {
    if (fullOTP == req.session.otp) {
      res.redirect("/resetPassword"); // reset password
    } else {
      return res.render("user/otp", {
        message: "invailid otp. Please enter the correct OTP.",
      });
    }
  }
});
//@des Get  login page
//@route Get /login
//@access  public

const getLoginPage = asyncHandler(async (req, res) => {
  res.render("user/login");
});
//@des post  login page
//@route post /login
//@access  public
const verifyUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const userData = await User.findOne({ email: email });
  console.log(userData);
  if (userData) {
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (
      passwordMatch 
      // userData.isAdmin === false &&
      // userData.is_blocked == false
    ) {
      res.redirect("/home");
    } else {
      // Handle incorrect password or user not authorized
      return res.status(401).redirect("/login");
    }
  } else {
    // Handle user not found
    return res.status(401).redirect("/login");
  }
});

//@des Get home page
//@route Get /
//@access  public

const getHomePage = asyncHandler(async (req, res) => {
  res.render("user/home");
});
//@des Get about page
//@route Get /
//@access  public

const getAboutPage = asyncHandler(async (req, res) => {
  res.render("user/about");
});
//@des Get contact page
//@route Get /
//@access  public

const getContactPage = asyncHandler(async (req, res) => {
  res.render("user/contact");
});
//@des Get Jewellery page
//@route Get /
//@access  public

const getJewelleryPage = asyncHandler(async (req, res) => {
  res.render("user/jewellery");
});
//@des Get Jewellery page
//@route Get /
//@access  public

const getProductDetailPage = asyncHandler(async (req, res) => {
  res.render("user/productDetailed");
});




module.exports = {
  getIndexPage,
  getHomePage,
  getAboutPage,
  getContactPage,
  getJewelleryPage,
  getLoginPage,
  getSignupPage,
  getOtpPage,
  registerUser,
  verifyUser,
  verifyOtp,
  getProductDetailPage
};
