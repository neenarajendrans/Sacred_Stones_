const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const { model } = require("mongoose");


const getCartPage = asyncHandler(async(req,res)=>{
    res.render('user/cart');
});

module.exports= {getCartPage}