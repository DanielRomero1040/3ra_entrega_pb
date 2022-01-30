const Dao =require("./dao");
const CustomError = require("../errors/customError");
const {User} = require("../models/users");

let instance = null;

class UsersDao extends Dao{
    constructor(){
        super();
        this.type="users";
    }

    async getAll(){
        try{
            return await User.find().exec();

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
            instance = new UsersDao();
        }
        return instance;
    }
}

module.exports = UsersDao;