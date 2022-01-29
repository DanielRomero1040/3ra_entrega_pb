const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const productsSchema = new Schema({
    title:String,
    description:String,
    thumbnail:String,
    stock:Number,
    price:Number
});

const Product = mongoose.model('product',productsSchema);
module.exports = {Product};