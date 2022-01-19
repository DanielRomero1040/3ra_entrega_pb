const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config()

const user=process.env.USERDB;
const password=process.env.PASSDB;
const dbname=process.env.DBNAME;
const uri=`mongodb+srv://${user}:${password}@cluster0.hwv82.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri
).then(()=>console.log("Base de datos conectada"))
.catch(e=>console.log(e))

