const restorentModel=require('../Models/restorentsModel')
const restorentService={};

restorentService.restorents=async()=>{
    const restarents=await restorentModel.restorents()
    if(restarents.length>0){
      return restarents;
    }
    else{
       const error=new Error("No restorents availables")
       error.status=400
       throw error  
   }

}

module.exports=restorentService;