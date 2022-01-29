const ProductsDao = require("../dao/productsDao");

class ProductApi{
    constructor(){
        this.productsDao = ProductsDao.getInstance();
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
            let message = "error en la consulta";
            return res.status(500).json({
                message
            });
        }
    }

    async add(productNew){
        let newProduct = await this.productsDao.add(productNew);
        return newProduct;
    }

    async find(id){
        let products;
        if(id){
            products = await this.productsDao.getById(id);
        }else{
            products = await this.productsDao.getAll();
        }
        return products;
    }

    async delete(id){
        if(id){
            await this.productsDao.deleteById(id);
        }else{
            await this.productsDao.deleteAll();
        }
        return products;
    }

    async update(id, newProduct){
        let productUpdate = await this.productsDao.updateById(id, newProduct);
        return productUpdate;
    }
}

module.exports = ProductApi;