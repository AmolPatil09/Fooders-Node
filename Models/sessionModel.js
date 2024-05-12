const connection=require('../Utilities/connection')
let sessionModel={};

sessionModel.setSeesion=async(userId,sessionId)=>{
    const model=await connection.getSeesionCollection();
   
        const user=await model.create({
            userId:userId,
            sessionId:sessionId,
            createdAt:new Date(),
            expireAt:new Date(new Date().getTime()+30000)
        })
        return user.sessionId;
    
}
sessionModel.getUserId=async(userId)=>{
    const model=await connection.getSeesionCollection();
    const user=await model.find({sessionId:userId},{sessionId:1,_id:0})
    return user;
}
sessionModel.logout=async(sessionId)=>{
    const model=await connection.getSeesionCollection();
    const user=await model.deleteOne({sessionId:sessionId})
    return user;
}

sessionModel.checkUserSignIn=async(userId)=>{
    const model=await connection.getSeesionCollection();
    const user=await model.find({userId:userId})
    return user;
}
module.exports=sessionModel;