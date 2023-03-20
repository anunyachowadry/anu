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
   qnt:{
    type:Number
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
  
})
module.exports = mongoose.model('product' , productSchema)