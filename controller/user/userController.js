const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const message = require("../../config/mailer");
const Product = require("../../model/productModel");
const Category = require("../../model/categoryModel");

const securePassword = asyncHandler(async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
});

//@des Get index page
//@route Get /
//@access public
const getIndexPage = asyncHandler(async (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/home");
  }
  res.render("user/editAddress");
});

//@des Get signup page
//@route Get /signup
//@access public
const getSignupPage = asyncHandler(async (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/home");
  }
  res.render("user/signup");
});

//@des Post Signup / Register User
//@route Post /signup
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;
  const existMail = await User.findOne({ email: email });

  if (existMail) {
    return res.render("user/login", {
      message: "This user already exists",
    });
  } else {
    req.session.userData = req.body;
    req.session.email = email;
    const data = await message.sendVarifyMail(req, req.session.email);
    res.redirect("/otp");
  }
});

//@des Get otp page
//@route Get /otp
//@access User
const getOtpPage = asyncHandler(async (req, res) => {
  res.render("user/otp");
});

//@des verify OTP
//@route post /otp
//@access User
const verifyOtp = asyncHandler(async (req, res) => {
  const userData = req.session.userData;

  if (req.body.otp == req.session.otp) {
    if (userData.is_blocked) {
      return res.redirect("/");
    }

    const secure_password = await securePassword(userData.password);
    const user = new User({
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: secure_password,
    });

    const userDataSave = await user.save();
    if (userDataSave && !userDataSave.isAdmin) {
      req.session.user_id = userDataSave._id;
      res.redirect("/home");
    } else {
      return res.render("user/otp", { message: "Registration Failed" });
    }
  } else {
    return res.render("user/otp", {
      message: "Invalid OTP. Please enter the correct OTP.",
    });
  }
});

//@des Get login page
//@route Get /login
//@access user
const getLoginPage = asyncHandler(async (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/home");
  }
  res.render("user/login", { message: '' });
});

//@des post login page
//@route post /login
//@access user
const verifyUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email: email });

  if (userData) {
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      req.session.user_id = userData._id;
      res.redirect("/home");
    } else {
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
});

//@des logout user
//@route redirect /
//@access user
const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/home');
    }
    res.redirect('/login');
  });
});

//@des Get home page
//@route Get /home
//@access authorized User
const getHomePage = asyncHandler(async (req, res) => {
  const category = await Category.find({});
  const product = await Product.find({});
  res.render("user/home", { category, product });
});

//@des Get about page
//@route Get /about
//@access authorized User
const getAboutPage = asyncHandler(async (req, res) => {
  res.render("user/about");
});

//@des Get contact page
//@route Get /contact
//@access authorized User
const getContactPage = asyncHandler(async (req, res) => {
  res.render("user/contact");
});

//@des Get Jewellery page
//@route Get /jewellery
//@access authorized User
const getJewelleryPage = asyncHandler(async (req, res) => {
  const product = await Product.find({});
  const category = await Category.find({});
  res.render("user/jewellery", { product, category });
});

//@des Get product details page
//@route Get /productdetails
//@access public
const getProductDetailPage = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.query.id });
  res.render("user/productDetailed", { product });
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
  getProductDetailPage,
  logout,
  resendOtp: asyncHandler(async (req, res) => {
    const data = await message.sendVarifyMail(req, req.session.email);
    res.redirect("/otp");
  }),
  registerGoogleUser: asyncHandler(async (req, res) => {
    res.redirect('/home');
  })
};

// if (req.body.forgotPassword) {
//   if (req.body.otp == req.session.otp) {
//     res.redirect("/resetPassword");
//   } else {
//     return res.render("user/otp", {
//       message: "Invalid OTP. Please enter the correct OTP.",
//     });
//   }
// }