const Product = require("../../model/productModel");
const path=require('path')
const Category = require("../../model/categoryModel");
const User=require("../../model/userModel")
const asyncHandler = require('express-async-handler')
// GET CATEGORY
const getCategoryManagement = asyncHandler(async (req, res) => {
    res.render("admin/categoryManagement");
  });

// ADD CATEGORY
const addCatagory = asyncHandler(async(req,res)=>{
  const {name , description}= req.body;
  console.log("7777777777",req.body)
    let category = new Category({name, description}); // created new category model 

    category = await category.save(); // filled it with data

    if(!category)
        return res.status(404).send('The category cannot be created');

    res.send(category);
}
)
const getAddCategory = asyncHandler(async (req, res) => {
    res.render("admin/addCategory");
  });
const getEditCategory = asyncHandler(async (req, res) => {
    res.render("admin/editCategory");
  });
  const getDeleteCategory = asyncHandler(async (req, res) => {
    res.render("admin/categoryManagement");
  });


module.exports = {
     getCategoryManagement,
     getDeleteCategory,
     getEditCategory,
     addCatagory,
     getAddCategory
}