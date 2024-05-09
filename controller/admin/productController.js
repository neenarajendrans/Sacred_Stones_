const Product = require("../../model/productModel");
const path=require('path')
const Category = require("../../model/categoryModel");
const User=require("../../model/userModel");
const asyncHandler = require('express-async-handler')

// add product

const getProductManagement = asyncHandler(async (req, res) => {
    res.render("admin/productManagement");
  });


const addProduct = asyncHandler(async(req,res)=>{
    console.log(req.body)
    console.log(req.files)
   
  //   const {name, description, image, images, gross_weight, gold_purity, category, making_charge, total_price, discount_price, stock}=req.body;
  //   let product = new Product({
  //       name,
  //       description,
  //       image,
  //       images,
  //       gross_weight,
  //       gold_purity,
  //       category,
  //       making_charge,
  //       total_price,
  //       discount_price,
  //       stock

  //   });

  //   product = await product.save();
  //   if(!product)
  //     return res.status(404).send('The category cannot be created');

  // res.send(product);
})

const getAddProduct = asyncHandler(async (req, res) => {
    res.render("admin/addProduct");
  });
const getEditProduct= asyncHandler(async (req, res) => {
    res.render("admin/editProduct");
  });


module.exports={getProductManagement,
    getEditProduct,
    getAddProduct,
    addProduct
}