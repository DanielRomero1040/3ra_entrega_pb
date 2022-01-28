const {getAllUser}= require("../services/userServices");
class UsersController {

    getProfile = (req,res) =>{
        res.render("profile", {user:req.session.passport.user[0].username});
        console.log(req.session.passport.user[0].username)
    }

    getAllUsersController = async (req,res)=>{
            let response = await getAllUser(res);        
    }

    getLogin = (req,res)=>{
        res.render("signin")
    }

    getSignUp = (req,res)=>{
        req.logOut();
        res.render("signup")
    }

    getLogout = (req,res)=>{
        res.send("bienv");
    }
    
}

module.exports = {UsersController};
