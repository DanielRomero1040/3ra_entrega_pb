const passport = require("passport")
const LocalStrategy=require("passport-local").Strategy
const db = require('./db');
const {User} = require("./models/users");
const {bcrypt} = require('bcryptjs');


//sign up
passport.use("local-signup",new LocalStrategy({
        passReqToCallback:true
},async (req,username,password,done)=>{
    //validar
    let user = await User.find({
        username: username
    });
    console.log("usuario",user)
    if(!user.length){
        let userNew = await User.create({
            username: username,
            password
        })
        console.log('nuevo',userNew)
        return done(null, userNew)
    }
    return done(null,false);

}));

//sign in
passport.use("local-login",new LocalStrategy(async(username, password,done)=>{
    let user = await User.find({
        username,
        password
    })
    console.log("usuario",user);
    if(!user.length){
        console.log("usuario no encontrado");
        return done(null, false);
    }
    // if(!isValidPassword(user, password)){
    //     console.log("contrasena incorrecta");
    //     return done(null, false);
    // }
    return done(null,user);
}))

//serializacion
passport.serializeUser((user, done)=>{
    console.log(user)
    done(null, user)
})

//des serializacion
passport.deserializeUser(async(id, done)=>{
    let user = await User.find({
        
        id
        
    });
    done(null,user)
});

// function isValidPassword(user, password) {
//     return bCrypt.compareSync(password, user.password);
//    }
   

module.exports = passport