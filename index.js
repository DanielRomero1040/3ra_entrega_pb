const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require("cors");


const yargs = require ("yargs/yargs")(process.argv.slice(2))
const args = yargs.default({
    port:8080
}).argv

const dotenv = require("dotenv");
dotenv.config()

// graphql schema en el dao de carrit
const {CartDao,schemaCartGql} = require("./src/dao/cartDao");
const {graphqlHTTP}=require("express-graphql");
const Cart = CartDao.getInstance();
const root = {
    getAll: Cart.getAll,
    getById: Cart.getById,
    add: Cart.add
}


//-------------

//-- child process
const {exec,spawn} = require("child_process")

/*exec("ls", (error, stdout,stderr)=>{
    if(error){
        console.log(`error: ${error.message}`)
        return
    }
    if(stderr){
        console.log(`stderr: ${stderr}`)
        return
    }

    console.log(`stdout: ${stdouts}`)
})*/


const app = express();
const session = require("express-session")
const passport = require("passport")

//DAtABASE
//const {db}=require("./src/db");
const req = require("express/lib/request");
const res = require("express/lib/response");

//session
app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true
}))



//plantilla
app.set("views",__dirname+"/src/views")
app.set("view engine","ejs")

//passport
app.use(passport.initialize())
app.use(passport.session())


//routes
const usersRoutes = require('./src/routes/users');
const productsRoutes = require('./src/routes/products');

//----------- middlewares y rutas ------------
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/users", usersRoutes); 
app.use("/api/products", productsRoutes);
app.use(cors());

app.use("/graphql",graphqlHTTP({
    schema:schemaCartGql,
    rootValue:root,
    graphiql:true
}));
//-------- fork



app.get("/random", (req,res)=>{
   let random = fork("./random.js");
   random.send("start")
   process.on("message",(sum)=>{
       res.send(sum)       
   })
})

//--- process

let pid = process.cwd();
let path = process.pid;
let nodev = process.version;
let title = process.title;
let platform = process.platform;
let memory = process.memoryUsage();
console.log("Process:",memory)



app.get("/info", (req,res)=>{
    res.render("info",{pid, path, nodev, title, platform,memory})
})
app.get("/data", (req,res)=>{
    res.send(`server run on PORT ${PORT} HOST ${HOST} - PID ${process.pid}`)
})



let PORT = process.env.PORT;
let HOST = process.env.HOST;

app.listen(PORT, ()=>{
    /*db.sync({force:false})
    .then(()=>{
        console.log("conectado a la base de datos")
    }).catch((err)=> {
        console.log(err)
    })*/
    console.log(`server run on PORT ${PORT} HOST ${HOST} - PID ${process.pid} `)
});

module.exports = app;

