const ProductsApi= require("../services/productsServices");
let instance = null;

class ProductsController {
    constructor(){
        this.productsApi = new ProductsApi();
    }

    getAllProductsController = async (req,res)=>{
        let response = await this.productsApi.getAll(res);
    }

    getLogin = (req,res)=>{
        res.render("signin")
    }

    getSignUp = (req,res)=>{
        req.logOut();
        res.render("signup")
    }

    getLogout = (req,res)=>{
        res.send("bienv");
    }

    static getInstance (){
        if(!instance){
            instance = new ProductsController();
        }
        return instance;
    }
    
}

module.exports = {ProductsController};
