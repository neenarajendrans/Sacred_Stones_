const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");

// @des Get adminlogin page
//@route Get /admin
//@access public

const getAdminLoginPage = asyncHandler(async (req, res) => {
  res.render("admin/adminLogin");
});

const adminLogin = asyncHandler((req, res) => {
  console.log("0000000000000", req.body);
  const {email, password}= req.body;
  if (email === "sacredstonesnrs@gmail.com" && password === "Neena@1999") {

    res.redirect("/admin/dashboard");
  }
});

const loadUserManagement = asyncHandler(async (req, res) => {

    console.log("inside load user managemnentg")
  const users = await User.find({});
  console.log(users);
  res.render("admin/userManagement", { users });
});

const blockUser = asyncHandler(async (req, res) => {
  console.log('inside block user')
  const userId = req.params.id;
  await User.updateOne({ _id: userId }, { $set: { is_blocked: true } });
  res.status(200).json({ success: true });
});//session clear at block


const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  await User.updateOne({ _id: userId }, { $set: { is_blocked: false } });
  res.status(200).json({ success: true });
});

// @des Get adminlogin page
//@route Get /admin
//@access public

const getAdminDashboardPage = asyncHandler(async (req, res) => {
  res.render("admin/adminPanel");
});


// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });
// const getAdminDashboardPage = asyncHandler(async (req, res) => {
//   res.render("admin/adminPanel");
// });



module.exports = { getAdminLoginPage, getAdminDashboardPage, adminLogin ,loadUserManagement, blockUser , unblockUser};
