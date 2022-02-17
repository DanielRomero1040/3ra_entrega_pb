const productsDao = require("./productsDao");
const usersDao = require("./usersDao");
const cartDao = require("./cartDao");

class DaoFactory{
    createDao =(data)=>{
        if(data.type === "products") return productsDao.getInstance();
        if(data.type === "users") return usersDao.getInstance();
        if(data.type === "cart") return cartDao.getInstance();
    }
}

module.exports = DaoFactory;