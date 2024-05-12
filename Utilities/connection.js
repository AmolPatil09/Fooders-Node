const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
      type:String,
      require:true
  
     },
     lastName:{
        type:String,
        require:true
     },
    
     userName:{
      type:String,
      unique:true,
      require:true
     },
     emailId:{
        type:String,
        unique:true,
        require:true
        
       },
     password:{
        type:String,
        require:true
        
       },

})

const sessionSchema=new mongoose.Schema({
   userId:{
      type:String,
      require:true
  
     },
     sessionId:{
        type:String,
        require:true
     },
},{timestamps:true}
)

const locationSchema = new mongoose.Schema({
   address: { type: String, required: true },
   city: { type: String, required: true },
   zipcode: { type: String, required: true },
   country: { type: String, required: true }
 });

 const contactSchema = new mongoose.Schema({
   phone: { type: String },
   email: { type: String },
   website: { type: String }
 });
 
 
 const reviewSchema = new mongoose.Schema({
   user: { type: String, required: true },
   rating: { type: Number, required: true },
   comment: { type: String }
 });
 

 const menuItemSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String },
   price: { type: Number, required: true }
 });
 
 const restaurantSchema = new mongoose.Schema({
   name: { type: String, required: true },
   location: { type: locationSchema, required: true },
   contact: { type: contactSchema },
   cuisine: [{ type: String }],
   rating: { type: Number },
   reviews: [{ type: reviewSchema }],
   openingHours: { type: Map, of: String },
   menu: [{ type: menuItemSchema }]
 });
const connection={}
const url="mongodb://127.0.0.1:27017/Fooders"
const connect=async(docName,dacName)=>{
   return (await mongoose.connect(url,{useNewUrlParser:true})).model(docName,dacName)
}

connection.getUserCollection=async()=>{
    try {
     return await connect('users',userSchema)
    } catch (err) {
         let error =new Error("Could not connect database");
         error.status=500;
         throw error
    
    }
 }
 connection.getSeesionCollection=async()=>{
   try {
    return await connect('session',sessionSchema)
   } catch (err) {
        let error =new Error("Could not connect database");
        error.status=500;
        throw error
   
   }
}

connection.getRestarentsCollection=async()=>{
   try {
    return await connect('restarents',restaurantSchema)
   } catch (err) {
        let error =new Error("Could not connect database");
        error.status=500;
        throw error
   
   }
}

 module.exports=connection