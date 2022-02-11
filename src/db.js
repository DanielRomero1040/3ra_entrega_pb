const mongoose = require('mongoose');
const dotenv = require("dotenv");
const CustomError = require("./errors/customError")
dotenv.config()

const user=process.env.USERDB;
const password=process.env.PASSDB;
const dbname=process.env.DBNAME;
const testdbname = process.env.TESTDBNAME;
const uri=`mongodb+srv://${user}:${password}@cluster0.hwv82.mongodb.net/${dbname}?retryWrites=true&w=majority`;
let instance = null;

let database = uri;

class MyMongoClient{
    constructor(){
        this.connected = false;
        this.client = mongoose;
    }

    async connect(){
        try{
            this.client.connect(database
            ).then(()=>console.log("Base de datos conectada"))
            .catch(e=>console.log(e))

        }catch(e){
            throw new CustomError(500,"Error al conectarse a mongo db")
        }
    }

    async disconnect(){
        try{
            await this.client.connection.close()
            console.log("Base de datos desconectada")
        }catch(e){
            throw new CustomError(500,"Error al desconectarse a mongo db")
        }
    }

    static getInstance(){
        if(!instance){
            instance = new MyMongoClient();
        }
        return instance;
    }

}

module.exports = MyMongoClient;



