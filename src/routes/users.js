const express = require("express");
const {getAllUser}= require("../services/userServices")

const {Router} = express;
const router =  new Router();
//----------------------------------------
const passport = require("passport")
const configPassport = require("../passport")

//-------
const auth = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect("/api/users/login")
}

router.get("/profile",auth ,(req,res)=>{
    res.render("profile", {user:req.session.passport.user[0].username});
    console.log(req.session.passport.user[0].username)
})

router.get("/login", (req,res)=>{
    res.render("signin")
})

router.get("/signup", (req,res)=>{
    req.logOut();
    res.render("signup")
})

router.get("/logout",(req,res)=>{
    res.send("bienv")
})

router.get("/users",async(req,res)=>{
    let response = await getAllUser(res);
})

router.post("/signup",passport.authenticate("local-signup",{
    successRedirect:"/api/users/login",
    failureRedirect:"/api/users/signup"
}))

router.post("/login",passport.authenticate("local-login",{
    successRedirect:"/api/users/profile",
    failureRedirect:"/api/users/login"
}))

module.exports = router;
