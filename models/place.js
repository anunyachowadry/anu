const mongoose = require('mongoose');

const subObj = mongoose.Schema({

      name: { type: String, required:true}, //required: true },
	  qnt: {type: Number, required:true}, //required: true},
      price: { type: Number, required:true},
      imgurl:{type: String},
//       grandtotal:{type:Number,required:true},
//       Totalprice:{type:Number,required:true},
      prodId:{type:String,required:true}
	//required: true }
       })

    //    const address = mongoose.Schema({
    //         Streetname:{type:String, required:true},
    //         City:{type:String, required:true},
    //         Country:{type: String, required:true},
    //          ZIP: {type: Number, required:true}
    //   })
       

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
       
       
});

   
module.exports = mongoose.model('place', placeSchema);