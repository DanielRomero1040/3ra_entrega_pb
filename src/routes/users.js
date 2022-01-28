const express = require("express");
const {UsersController}= require("../controller/usersController");

const {Router} = express;
const router =  new Router();
//----------------------------------------
const passport = require("passport")
const configPassport = require("../passport")

const UserController = new UsersController();

//-------
const auth = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.redirect("/api/users/login")
}

router.get("/profile",auth , UserController.getProfile);

router.get("/login", UserController.getLogin);

router.get("/signup", UserController.getSignUp);

router.get("/logout", UserController.getLogout)

router.get("/users",UserController.getAllUsersController);

router.post("/signup",passport.authenticate("local-signup",{
    successRedirect:"/api/users/login",
    failureRedirect:"/api/users/signup"
}));

router.post("/login",passport.authenticate("local-login",{
    successRedirect:"/api/users/profile",
    failureRedirect:"/api/users/login"
}));

module.exports = router;
