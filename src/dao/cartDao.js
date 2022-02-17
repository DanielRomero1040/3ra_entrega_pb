const Dao =require("./dao");
const {Cart}=require("../models/productsCart")
const CustomError = require("../errors/customError");
const {gql,ApolloServer} = require("apollo-server");

const {buildSchema, buildClientSchema}=require("graphql");

//graphql
const schemaCartGql = buildSchema(`
    type Cart{
        _id:String!
        title:String!
        description:String!
        thumbnail:String!
        stock:Int!
        price:Int!
        quantity:Int!
    }

    type Query{
        getAll: [Cart]  
        getById(_id:String): Cart
    }

    type Mutation{
        add(
            _id:String!
            title:String!
            description:String! 
            thumbnail:String! 
            stock:Int!
            price:Int!
            quantity:Int!
            ):Cart
        
    }
`)

let instance = null;

class CartDao extends Dao{
    constructor(){
        super();
        this.type="cart";
    }

    async getAll(){
        try{
            return await Cart.find().exec();

        }catch(e){
            throw new CustomError(500, "Error en ProductsDao getAll");
        }
        
    }
    async getById(id){
        try{
            let products;
            products = await Cart.findOne({
                _id:id._id
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
            let product = await Cart.findOne({
                title: newProduct.title
            });
            console.log("product",product)
            if(!product){
                let productNew = await Cart.create({
                    _id:newProduct._id,
                    title: newProduct.title,
                    description:newProduct.description,
                    thumbnail:newProduct.thumbnail,
                    stock:newProduct.stock,
                    price:newProduct.price,
                    quantity:newProduct.quantity
                })
                console.log('nuevo producto',productNew);
                msg ={
                    isProductAlreadyCreate: isProductAlreadyCreate,
                    product:productNew
                }
                return productNew
            }
            msg ={
                isProductAlreadyCreate:true,
                product
            }
            return product;

        }catch(e){
            throw new CustomError(500, "Error en ProductsDao add");
        };

        
    }
    async updateById(id, productUpdated){
        try{
            let product;            
            product = await Cart.findOneAndUpdate({ _id: id },{
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
            product = await Cart.deleteOne({ _id: id }).catch((e)=>{
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
            instance = new CartDao();
        }
        return instance;
    }
}

module.exports = {CartDao,schemaCartGql};