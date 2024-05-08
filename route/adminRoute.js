const express = require('express');
const adminRoute = express.Router();
const adminController = require('../controller/admin/adminController');
const categoryController = require('../controller/admin/categoryController');
const productController = require('../controller/admin/productController');
adminRoute.get('/login',adminController.getAdminLoginPage);
adminRoute.post('/login',adminController.adminLogin);

adminRoute.get('/dashboard',adminController.getAdminDashboardPage);
adminRoute.get('/category',adminController.getCategoryManagement);
adminRoute.get('/products',adminController.getProductManagement);

adminRoute.get('/usermanagement',adminController.loadUserManagement)
adminRoute.get('/block/:id',adminController.blockUser)
adminRoute.get('/unBlock/:id',adminController.unBlockUser)



// category

// adminRoute.post('/category',categoryController.addCategory)

module.exports = adminRoute;