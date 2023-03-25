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
    color: {
        type: String
    },   
    date: {
        type: String
    },   
    thick: {
        type: String
    },   
    quality: {
        type: String
    },   
    region: {
        type: String
    },   
   Quantity:{
    type:String
   },

   size:{
    type:String
   },
   description:{
    type:String
   },
   mobile:{
    type:Number
   },
   manufacturername:{
    type:String
   },
   PhoneNumber:{
    type:String
   },
   qnt:{
    type:String
   },
   Totalprice:{
    type:String
   }

  
})
module.exports = mongoose.model('product' , productSchema)