const mongoose = require('mongoose')

const signupScheema = new mongoose.Schema({
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
    Password: {
        type: String
    },
    UserType: {
        type: String
    },
    City: {
        type: String
    },
    Pincode: {
        type: String
    }, 
    Street: {
        type: String
    },
    Company: {
        type: String
    },
    ManufacturerID: {
        type: String
    }

})

module.exports = mongoose.model('signup' , signupScheema)