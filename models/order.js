const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
Image1:{
    type:String,
    
},
Image2:{
    type:String,
    
},
Image3:{
    type:String,
    
},
Quantity:{
    type:String,
    
},
Name:{
    type:String,
},
Price:{
    type:String,
},
Size:{
    type:String,
  
},
Description:{
    type:String
},
Type:{
    type:String
},

OrderId :{
    type:String,
},

Date:{
    type:String,
}
 
})
module.exports = mongoose.model('order' , OrderSchema)