const userModel=require('../Models/userModel')
let userService={};
const {v4: uuidv4}=require('uuid')
const sessionService=require('./sessionService')

userService.register=async(register)=>{
    const user=await userModel.checkUser(register.emailId)
    if (user) {
      const error=new Error("User is alredy register")
      error.status=400
      throw error
    } else {
      const creatUser= await userModel.register(register);
      if (creatUser) {
        return creatUser;
  
      } else {
          const error=new Error("Something went wrong")
          error.status=400
          throw error 
      }
    }
  }
  userService.login=async(emailId,password)=>{
       const user=await userModel.checkUser(emailId);
       if(user){
          if(user.password===password){
            {
                    const sessionId=uuidv4();
                    const session=await sessionService.createSession(user._id,sessionId)
                    return session;
                
            }
          }
          else{
              const error=new Error("Incorrect Password")
              error.status=400
              throw error  
          }
       }
       else{
          const error=new Error("User not exist")
          error.status=400
          throw error  
      }
  }

  userService.logout=async(sessionId)=>{
    const logout=await sessionService.logout(sessionId);
    return logout;
  }

module.exports=userService;