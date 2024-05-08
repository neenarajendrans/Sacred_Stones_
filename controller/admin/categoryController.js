const Product = require("../../model/productModel");
const path=require('path')
const Category = require("../../model/categoryModel");
const User=require("../../model/userModel")
const asyncHandler = require('express-async-handler')

// ADD CATEGORY
const addCatagory = asyncHandler(async(req,res)=>{
    const {name , description}= req.body;
    let category = new Category({name, description}); // created new category model 

    category = await category.save(); // filled it with data

    if(!category)
        return res.status(404).send('The category cannot be created');

    res.send(category);
}
)

module.exports = {
    addCatagory
}