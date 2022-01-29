const ProductsApi= require("../services/productsServices");
let instance = null;

class ProductsController {
    constructor(){
        this.productsApi = new ProductsApi();
    }

    getAllProductsController = async (req,res)=>{
        let response = await this.productsApi.getAll(res);
    }

    getById = async (req,res)=>{
        let response = await this.productsApi.getById(req.params.id,res) ;      
    }

    addProduct = async (req,res)=>{
        let response = await this.productsApi.add(req.body,res);
        console.log(req.body)
    }

    updateById = async(req,res)=>{
        let response = await this.productsApi.updateById(req.params.id,req.body,res);
        console.log(req.params, req.body)        
    }

    deleteById = async (req,res)=>{
        let response = await this.productsApi.deleteById(req.params.id,res);
    }

    static getInstance (){
        if(!instance){
            instance = new ProductsController();
        }
        return instance;
    }
    
}

module.exports = {ProductsController};
