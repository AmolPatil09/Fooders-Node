const restarentsService=require('../Service/restorentsService')
const restrentController={};

restrentController.restorents=async(req,res,next)=>{
  
    try {
        const restorents=await restarentsService.restorents();
        res.json(restorents)
            
        } catch (error) {
            next(error)
        }
    

}

module.exports=restrentController;