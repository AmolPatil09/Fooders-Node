const connection=require('../Utilities/connection')


const restorentService={};

restorentService.restorents=async()=>{

    const model=await connection.getRestarentsCollection();
    const restarents=await model.find({}) 
    return restarents;
}

module.exports=restorentService;