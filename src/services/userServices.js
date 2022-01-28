const {User} = require("../models/users");

const getAllUser = async(res)=>{
    try{
        let message = "registros encontrados.";
        const userArray = await User.find().exec();
        console.log(userArray);

        if(!userArray.length){
            message = "no existen registros.";
        }

        return res.status(200).json({
            message,
            userArray
        })

    }catch(e){
        console.error(e);
        let message = "error en la consulta";
        return res.status(500).json({
            message
        });
    }
}

module.exports = {
    getAllUser
}