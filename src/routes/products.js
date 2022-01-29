const express = require("express");
const {ProductsController}= require("../controller/productsController");

const {Router} = express;
const router =  new Router();
//----------------------------------------
const ProductController = ProductsController.getInstance();
//----------------------------------------

router.get("/products",ProductController.getAllProductsController );

module.exports = router;
