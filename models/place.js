const mongoose = require('mongoose');

const subObj = mongoose.Schema({

      name: { type: String, required:true}, 
      qnt: {type: Number, required:true}, 
      price: { type: Number, required:true},
      imgurl:{type: String},
      prodId:{type:String,required:true},
      Totalprice:{type:String,required:true},
      Grandtotal:{type:String,required:true},
      OrderStatus:{type:String,required:true},
      ApproximateTime:{type:String,required:true},
      color:{type:String,required:true},
      manufacturername:{type:String,required:true},
      PhoneNumber:{type:String,required:true}
	
})  
       

const placeSchema = mongoose.Schema({
       _id: mongoose.Schema.Types.ObjectId,
    
       Firstname:{type:String},
       Lastname:{type:String},
       PhoneNumber:{type: String},
       Pincode:{type:String},
       Email:{type:String},
       City:{type:String},
       State:{type:String},
       Area:{type:String},    
       OrderItems: [subObj] 
},{
timestamps:true
}); 
   
module.exports = mongoose.model('place', placeSchema);