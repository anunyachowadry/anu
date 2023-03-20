const mongoose = require('mongoose')

const dealerSchema = new mongoose.Schema({
// Image:{
//     type:String
// },

Firstname:{
        type:String
    },
    Lastname:{
        type:String
    },
    Company:{
        type:String
    },
    mobile: {
        type: String
    },
   
    Email: {
        type: String
    },
   Address:{
    type:String
   },
   Location:{
    type:String
   },
    Location:{
    type:String
   },
   UserType:{
    type:String
   }
   
   
   
   
  
})
module.exports = mongoose.model('dealer' , dealerSchema)