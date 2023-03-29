const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const inventorySchema = new mongoose.Schema({

 
prodId:{
       type: String,
      
    },
Quantity:{
      type: String,
    
     }
    
   
     })

    const Inventory = mongoose.model('inventory',inventorySchema)
    
module.exports = Inventory