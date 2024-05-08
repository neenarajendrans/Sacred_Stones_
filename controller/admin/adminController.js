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
  if (
    req.body.email === "sacredstonesnrs@gmail.com" &&
    req.body.password === "Neena@1999"
  ) {
    req.session.isAdmin = true;
    res.redirect("/admin/dashboard");
  } else {
    req.session.message = "Invalid Credentials";
    res.redirect("/admin/login");
  }
});

const loadUserManagement = asyncHandler(async (req, res) => {

    console.log("inside load user managemnentg")
  const users = await User.find({});
  console.log(users);
  res.render("admin/userManagement", { users });
});

const blockUser = asyncHandler(async(req,res)=>{
    const userId = req.params._id;
    console.log(req.params.id);
    const userData = await User.updateOne({_id : userId},{$set:{is_blocked : true}});
    const users = await User.find({});
  console.log(users);
    res.status(200).json({success:true})

})

const unBlockUser = asyncHandler(async(req,res)=>{
    const userId = req.params._id;
    const userData = User.updateOne({_id: userId}, { is_blocked : false})
    res.status(200).json({success:true})
})

// @des Get adminlogin page
//@route Get /admin
//@access public

const getAdminDashboardPage = asyncHandler(async (req, res) => {
  res.render("admin/adminPanel");
});
const getCategoryManagement = asyncHandler(async (req, res) => {
  res.render("admin/categoryManagement");
});
const getProductManagement = asyncHandler(async (req, res) => {
  res.render("admin/productManagement");
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



module.exports = { getAdminLoginPage, getAdminDashboardPage, adminLogin ,loadUserManagement,getCategoryManagement, blockUser , unBlockUser, getProductManagement};
