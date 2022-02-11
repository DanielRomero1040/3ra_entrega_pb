const Dao =require("./dao");
const {Product}=require("../models/products")
const CustomError = require("../errors/customError");

let instance = null;

class ProductsDao extends Dao{
    constructor(){
        super();
        this.type="products";
    }

    async getAll(){
        try{
            return await Product.find().exec();

        }catch(e){
            throw new CustomError(500, "Error en ProductsDao getAll");
        }
        
    }
    async getById(id){
        try{
            let products;
            products = await Product.find({
                _id:id
            }).exec().catch((e)=>{});
            if(!products){
                products = [];
            }
            return products;
        }catch(e){            
            throw new CustomError(500, "Error en ProductsDao getById");
        }
        
    }
    async add(newProduct){

        try{
            //validar
            let isProductAlreadyCreate = false;
            let msg = {};
            let product = await Product.findOne({
                title: newProduct.title
            });
            console.log("product",product)
            if(!product){
                let productNew = await Product.create({
                    title: newProduct.title,
                    description:newProduct.description,
                    thumbnail:newProduct.thumbnail,
                    stock:newProduct.stock,
                    price:newProduct.price
                })
                console.log('nuevo',productNew);
                msg ={
                    isProductAlreadyCreate: isProductAlreadyCreate,
                    product:productNew
                }
                return msg
            }
            msg ={
                isProductAlreadyCreate:true,
                product
            }
            return msg;

        }catch(e){
            throw new CustomError(500, "Error en ProductsDao add");
        };

        
    }
    async updateById(id, productUpdated){
        try{
            let product;            
            product = await Product.findOneAndUpdate({ _id: id },{
                title: productUpdated.title,
                description:productUpdated.description,
                thumbnail:productUpdated.thumbnail,
                stock:productUpdated.stock,
                price:productUpdated.price
            }).catch((e)=>{
                return product;
            });
            return product;
        }catch{
            throw new CustomError(500, "Error en ProductsDao updateById");
        };
        
    }
    async deleteById(id){
        try{
            let product;
            product = await Product.deleteOne({ _id: id }).catch((e)=>{
                return product;
            });
            return product;            
        }catch{
            throw new CustomError(500, "Error en ProductsDao deleteById");            
        };
        
    }
    async deleteAll(){
        throw new CustomError(500, "Error en ProductsDao deleteAll");
        
    }

    static getInstance (){
        if(!instance){
            instance = new ProductsDao();
        }
        return instance;
    }
}

module.exports = ProductsDao;