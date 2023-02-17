const mongoose = require('mongoose')

const dealerproductSchema = new mongoose.Schema({

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
    type:String
   },
})
module.exports = mongoose.model('dealerproduct' , dealerproductSchema)