class Dao{

    async getAll(){       
        
    }
    async getById(id){
        throw new CustomError(500, `error al usar el metodo getById , ${this.type}` );
        
    }
    async add(product){
        throw new CustomError(500, `error al usar el metodo add , ${this.type}` );
        
    }
    async deleteById(id){
        throw new CustomError(500, `error al usar el metodo deleteById , ${this.type}` );
        
    }
    async updateById(id, product){
        throw new CustomError(500, `error al usar el metodo updateById , ${this.type}` );
        
    }
    async deleteAll(){
        throw new CustomError(500, `error al usar el metodo deleteAll , ${this.type}` );
        
    }
    static getInstance (){}
    
}
module.exports = Dao;