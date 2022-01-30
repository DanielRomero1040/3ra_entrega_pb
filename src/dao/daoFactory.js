const productsDao = require("./productsDao");
const usersDao = require("./usersDao");

class DaoFactory{
    createDao =(data)=>{
        if(data.type === "products") return productsDao.getInstance();
        if(data.type === "users") return usersDao.getInstance();
    }
}

module.exports = DaoFactory;