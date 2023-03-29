const mongoose = require('mongoose');

const subObj = mongoose.Schema({
     
      name: { type: String, required:true}, //required: true },
	qnt: {type: String, required:true}, //required: true},
      price: { type: String, required:true},
      imgurl:{type: String},
      //  grandtotal:{type:Number,required:true},
      //  Totalprice:{type:Number,required:true},
      prodId:{type:String,required:true},
      Quantity:{type:String,required:true},
      size:{type:String,required:true},
      date:{type:String,required:true},
      quality:{type:String,required:true},
      region:{type:String,required:true},
      description:{type:String,required:true},
      thick:{type:String,required:true},
      OrderStatus:{type:String,required:true,default:'Placed'},
      ApproximateTime:{type:String,required:true,default:'Arriving Within 1 Week'},
      color:{type:String,required:true},
      manufacrurername:{type:String,required:true},
      PhoneNumber:{type:String,required:true}
	
       })

  
       

const orderSchema = mongoose.Schema({
       _id: mongoose.Schema.Types.ObjectId,

     Firstname:{type:String, required:true},
      Lastname:{type:String, required:true},
      PhoneNumber:{type: String, required:true},
      Pincode:{type:String, required:true},
      Email:{type:String,required:true},
      City:{type:String,required:true},
      State:{type:String,required:true},
      Address:{type:String,required:true},

    
       OrderItems: [subObj],
      //  OrderStatus:{type: String, required:true},
      //  OrderDate:{type: String, required: true},
    //   /*  TotalAmount:{type: String, reqired: true}, */
      //  OrderId:{type: String, reqired: true},
       
       
}, {
      timestamps: true
});

   
module.exports = mongoose.model('Order', orderSchema);