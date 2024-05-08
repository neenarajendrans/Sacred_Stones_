const Product = require("../../model/productModel");
const path=require('path')
const Category = require("../../model/categoryModel");
const User=require("../../model/userModel");
const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require('express-async-handler')

// add product


const addProduct = asyncHandler(async(req,res)=>{
    const {name, description, image, images, gross_weight, gold_purity, category, making_charge, total_price, discount_price, stock}=req.body;
    let product = new Product({
        name,
        description,
        image,
        images,
        gross_weight,
        gold_purity,
        category,
        making_charge,
        total_price,
        discount_price,
        stock

    });

    product = await product.save();
})