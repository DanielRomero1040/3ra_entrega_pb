const Dao =require("./dao");
const {Product}=require("../models/products")
const CustomError = require("../errors/customError")

let instance = null;

class ProductsDao extends Dao{
    async getAll(){
        try{
            return await Product.find().exec();

        }catch(e){
            throw new CustomError(500, "error al usar metodo getAll");
        }
        
    }
    async getById(id){
        throw new CustomError(500, "falta implementar metodo getById");
        
    }
    async add(product){
        throw new CustomError(500, "falta implementar metodo add");
        
    }
    async deleteById(id){
        throw new CustomError(500, "falta implementar metodo deleteById");
        
    }
    async updateById(id, product){
        throw new CustomError(500, "falta implementar metodo updateById");
        
    }
    async deleteAll(){
        throw new CustomError(500, "falta implementar metodo deleteAll");
        
    }

    static getInstance (){
        if(!instance){
            instance = new ProductsDao();
        }
        return instance;
    }
}

module.exports = ProductsDao;