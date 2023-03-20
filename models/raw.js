const mongoose = require('mongoose')

const rawSchema = new mongoose.Schema({
    Image:{
        type:String
    },
    Number:{
        type:String
    },
    Name: {
        type: String
    },
    color: {
        type: String
    },   
    size:{
        type:String
   },
   region:{
       type:String
   },
   date:{
       type:String
   }  
})
module.exports = mongoose.model('raw' , rawSchema)