const express = require('express');
const adminRoute = express.Router();
const adminController = require('../controller/admin/adminController');
const categoryController = require('../controller/admin/categoryController');
const productController = require('../controller/admin/productController');
const upload = require('../middleware/multer');
const { uploadProduct } = require('../middleware/multer');
adminRoute.get('/login',adminController.getAdminLoginPage);
adminRoute.post('/login',adminController.adminLogin);

adminRoute.get('/dashboard',adminController.getAdminDashboardPage);
adminRoute.get('/category',categoryController.getCategoryManagement);
adminRoute.get('/addcategory',categoryController.getAddCategory);
adminRoute.post('/addcategory',categoryController.addCatagory);
adminRoute.get('/editcategory',categoryController.getEditCategory);
adminRoute.get('/products',productController.getProductManagement);
adminRoute.get('/addproduct',productController.getAddProduct);
adminRoute.post('/addproduct',upload.array('images',3), productController.addProduct);
adminRoute.get('/editproduct',productController.getEditProduct);

adminRoute.get('/usermanagement',adminController.loadUserManagement)
adminRoute.get('/block/:id',adminController.blockUser)
adminRoute.get('/unBlock/:id',adminController.unBlockUser)



// category

// adminRoute.post('/category',categoryController.addCategory)

module.exports = adminRoute;