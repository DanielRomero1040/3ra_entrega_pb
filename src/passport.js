const passport = require("passport")
const LocalStrategy=require("passport-local").Strategy
const db = require('./db');
const {User} = require("./models/users")


//sign up
passport.use("local-signup",new LocalStrategy({
        passReqToCallback:true
},async (req,username,password,done)=>{
    //validar
    let user = await User.find({
        email: username
    });
    console.log(user)
    if(!user){
        let userNew = await User.create({
            username,
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
        email: username,
        password: password
    })
    console.log(user)
    if(user){
        done(null,user)
        return
    }
    done(null, false)
}))

//serializacion
passport.serializeUser((user, done)=>{
    done(null, user.id)
})

//des serializacion
passport.deserializeUser(async(id, done)=>{
    let user = await User.find({
        
        id
        
    });
    done(null,user)
});

module.exports = passport