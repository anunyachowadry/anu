const mongoose = require('mongoose')

const dealerSchema = new mongoose.Schema({
Image:{
    type:String
},

FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    CompanyName:{
        type:String
    },
    PrimaryPhoneNumber: {
        type: String
    },
    BusinessNumber: {
        type: String
    },
    Email: {
        type: String
    },
   Address:{
    type:String
   },
   StoreId:{
    type:String
   }
   
   
  
})
module.exports = mongoose.model('dealer' , dealerSchema)