const DaoFactory = require("../dao/daoFactory");

const DaoFact = new DaoFactory();

class UsersApi{
    constructor(){
        this.usersDao = DaoFact.createDao({type:"users"});
    }

    getAllUser = async(res)=>{
        try{
            let message = "registros encontrados.";
            const userArray = await this.usersDao.getAll();
            console.log(userArray);
    
            if(!userArray.length){
                message = "no existen registros.";
            }
    
            return res.status(200).json({
                message,
                userArray
            })
    
        }catch(e){
            console.error(e);
            let message = "error en la consulta";
            return res.status(500).json({
                message
            });
        }
    }

}


module.exports = UsersApi;