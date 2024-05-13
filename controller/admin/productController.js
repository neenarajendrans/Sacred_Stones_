const Product = require("../../model/productModel");
const path=require('path')
const Category = require("../../model/categoryModel");
const User=require("../../model/userModel");
const asyncHandler = require('express-async-handler')

// add product

  const getProductManagement = asyncHandler(async (req, res) => {

    const product = await Product.find({}).populate('category')
    console.log(product)
    
      res.render("admin/productManagement",{product});
    });


const addProduct = asyncHandler(async(req,res)=>{
    console.log(req.body)
    console.log("00000000",req.files)
   
    
    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        images:req.files.map(file => {
          return file.filename
      }),

        gross_weight:req.body.gross_weight,
        gold_purity:req.body.gold_purity,
        category:req.body.category,
        making_charge:req.body.making_charge,
        total_price:req.body.total_price,
        discount_price:req.body.discount_price,
        stock:req.body.stock

    });


    product = await product.save();
    if(!product)
      return res.status(404).send('The category cannot be created');

  
  res.redirect('/admin/products')
})

const getAddProduct = asyncHandler(async (req, res) => {
    const category = await Category.find({})
    console.log({category})
    res.render("admin/addProduct",{category});
  });
const getEditProduct= asyncHandler(async (req, res) => {
    res.render("admin/editProduct");
  });


module.exports={getProductManagement,
    getEditProduct,
    getAddProduct,
    addProduct
}