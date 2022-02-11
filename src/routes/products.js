const express = require("express");
const {ProductsController}= require("../controller/productsController");

const {Router} = express;
const router =  new Router();
//----------------------------------------
const ProductController = ProductsController.getInstance();
//----------------------------------------

router.get("/products",ProductController.getAll );

router.get("/:id",ProductController.getById );

router.post("/add", ProductController.addProduct);

router.patch("/update/:id", ProductController.updateById);

router.delete("/delete/:id", ProductController.deleteById);

module.exports = router;
