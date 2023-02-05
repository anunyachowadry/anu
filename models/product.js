const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  
    image: {
        type: String
    },
    Number: {
        type: Number,
        unique:true
    },
    Name: {
        type: String
    },
    Description: {
        type: String
    },
    Quantity: {
        type: String
    },
    Price: {
        type: String
    }
   
})
module.exports = mongoose.model('product' , productSchema)