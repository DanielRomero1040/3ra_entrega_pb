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
    res.redirect("/login")
}

router.get("/profile",auth ,(req,res)=>{
    res.render("profile", {user:req.user.username})
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
    let response = await getAllUser();
})

router.post("/signup",passport.authenticate("local-signup",{
    successRedirect:"/login",
    failureRedirect:"/signup"
}))

router.post("/login",passport.authenticate("local-login",{
    successRedirect:"/profile",
    failureRedirect:"/login"
}))

module.exports = router;
