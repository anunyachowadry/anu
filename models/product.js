const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    imgurl:{
        type:String
    },
    price:{
        type:String
    },
    name: {
        type: String
    },
    prodId: {
        type: String
    },   
   qnt:{
    type:Number
   },
   Totalprice:{
    type:Number
   },
   Grandtotal:{
    type:Number
   }
  
})
module.exports = mongoose.model('product' , productSchema)