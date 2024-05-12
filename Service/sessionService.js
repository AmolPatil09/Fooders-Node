const sessionModel=require('../Models/sessionModel')
const sessionService={}
sessionService.createSession=async(userId,sessionId)=>{

  const checkUserSignIn=await sessionModel.checkUserSignIn(userId);
  if(checkUserSignIn.length!=0)
    {
      const err=new Error("user alredy login")
      err.status=400
      throw err  
    }
    else{
   try {
    const session=await sessionModel.setSeesion(userId,sessionId);
    return session;
   } catch (error) {
    const err=new Error("Somthing went wrong")
    err.status=400
    throw err 
   }
  }
}
sessionService.getSession=async(sessionId)=>{
  try {
    const userId=await sessionModel.getUserId(sessionId);
    return userId;
 } catch (error) {
  const err=new Error("Somthing went wrong")
  err.status=400
  throw err 
 }
}

sessionService.logout=async(sessionId)=>{
  try {
    const userId=await sessionModel.logout(sessionId);
    return userId;
 } catch (error) {
  const err=new Error("Somthing went wrong")
  err.status=400
  throw err 
 }
}


module.exports = sessionService;