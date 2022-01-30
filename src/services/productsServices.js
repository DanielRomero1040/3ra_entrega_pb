const DaoFactory = require("../dao/daoFactory");

const DaoFact = new DaoFactory()

class ProductApi{
    constructor(){
        this.productsDao = DaoFact.createDao({type:"products"});
    }

    getAll = async(res)=>{
        try{
            let message = "registros encontrados.";
            const productsArray = await this.productsDao.getAll();
            console.log(productsArray);
    
            if(!productsArray.length){
                message = "no existen registros.";
            }
    
            return res.status(200).json({
                message,
                productsArray: productsArray
            })
    
        }catch(e){
            console.error(e);
            let message = "error en la consulta Services getAll";
            return res.status(500).json({
                message
            });
        }
    }

    async add(productNew,res){
        let message = "Producto Creado Satisfactoriamente"
        let newProduct = await this.productsDao.add(productNew);
        if(newProduct.isProductAlreadyCreate){
            message="El producto estaba creado anteriormente, intente cambiar de title";
        }
        return res.status(200).json({
            message:message ,
            products: newProduct.product   
        });
    }

    async getById(id,res){
        try{
            let products;
            let message = "registro encontrado.";
            products = await this.productsDao.getById(id);
            console.log(products);
    
            if(!products.length){
                message = "no existen registros.";
                products = await this.productsDao.getAll();
            }
    
            return res.status(200).json({
                message,
                products: products
            })
    
        }catch(e){
            console.error(e);
            let message = "error en la consulta Services getById";
            return res.status(500).json({
                message
            });
        }

    }

    async updateById(id, newProduct,res){
        try{
            let message = "registro encontrado y actualizado.";
            let productUpdate = await this.productsDao.updateById(id, newProduct);
    
            if(!productUpdate){
                message = "no existen registros para actualizar.";
            }
    
            return res.status(200).json({
                message,
                products: productUpdate
            })
    
        }catch(e){
            console.error(e);
            let message = "error en la consulta Services updateById";
            return res.status(500).json({
                message
            });
        }

    }
    async deleteById(id,res){
        try{
            let product;
            let message = "Producto encontrado y eliminado.";
            product = await this.productsDao.deleteById(id);
            if(!product){
                message = "Producto no encontrado.";
            }
            return res.status(200).json({
                message,
                product
            });
        }catch(e){
            console.error(e);
            let message = "error en la consulta Services deleteById";
            return res.status(500).json({
                message
            });           
        };        
    }

}

module.exports = ProductApi;