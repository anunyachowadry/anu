const mongoose = require('mongoose')

const manufacturerSchema = new mongoose.Schema({
    Firstname: {
        type: String 
    },
    Lastname: {
        type: String      
    },
    Email: {
        type: String       
    },
    mobile: {
        type: String       
    },

    UserType: {
        type: String
    },

    Company: {
        type: String
    },

    Location:{
        type:String
    },
    Address:{
        type:String
    }

})

module.exports = mongoose.model('manufacturer' , manufacturerSchema)