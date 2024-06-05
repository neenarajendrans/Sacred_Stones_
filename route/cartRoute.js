const express = require('express');
const cartRoute = express.Router();
const cartController = require('../controller/user/cartController');

cartRoute.get('/cart',cartController.getCartPage);

module.exports = cartRoute;