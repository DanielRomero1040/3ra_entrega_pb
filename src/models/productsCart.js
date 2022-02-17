const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const cartSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

cartSchema.plugin(uniqueValidator);
const Cart = mongoose.model('Cart',cartSchema);
module.exports = {Cart};