const mongoose = require('mongoose')

const shipperSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Mobile:{
        type:String
    },
    Address:{
        type:String
    },
    Truck: {
        type: String
    },   
    Trucknumber:{
        type:String
   },
   Truckimage:{
       type:String
   },
   Licence:{
       type:String
   }  ,
   Aadhar:{
    type:String
   },
   Pan:{
    type:String
}
})
module.exports = mongoose.model('shipper' , shipperSchema)