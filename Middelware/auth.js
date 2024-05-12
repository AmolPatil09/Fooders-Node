
const sessionService=require('../Service/sessionService')
const auth={}
auth.restrictToLoggedinUserOnly=async(req, res, next)=> {
try {
  const sessionId=req.cookies?.uId

  if (!sessionId) {
    const error=new Error("unathorized user")
    error.status=400
    throw error 
  }
  const user = await sessionService.getSession(sessionId)

  if (user.length==0) {
        const error=new Error("unathorized user")
        error.status=400
        throw error   
    }
  req.user = user;
  next();
} catch (error) {
  next(error)
}
}

module.exports =auth;