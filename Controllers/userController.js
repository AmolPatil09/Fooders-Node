const userService=require('../Service/userService')

const userController={};
const {validationResult } = require('express-validator');
userController.register= async(req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const registerData=req.body;
    try {
    const register= await userService.register(registerData);
    res.json({"message":"registration successfuly",
        "status":200
    }) ;
    } catch (error) {
       next(error) 
    }

}

userController.login= async(req, res,next) => { 
    const {emailId,password}=req.body;
    try {
    const login=await userService.login(emailId,password);
    res.cookie("uId",login)
    res.json({"message":"login success",
    "status":200
    })
        
    } catch (error) {
        next(error)
    }

}

userController.logout= async(req, res,next) => { 
   const sessionId=req.cookies?.uId
   console.log("sessionId",sessionId);
    try {
    const logout=await userService.logout(sessionId);
    res.json({"message":"logout success"})
        
    } catch (error) {
        next(error)
    }

}

module.exports=userController;