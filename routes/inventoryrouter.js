const express = require('express')
const mongoose= require ('mongoose')


const Inventory = require('../models/inventory');









const router = express.Router();   // requiring router

router.get('/inventory', async (req,res) =>{ 
    try{  
    
         
        
        const inventory = await Inventory.find({})  // async makes a function return a Promise
                                                 //await makes a function wait for a Promise
        res.status(200).json({
            Totalinventory : inventory.length,   // length of the products in schema
            inventory
        })
    }catch (error) {
        res.status(400).send(error)
    } 
    })

    router.post('/post',(req,res,next)=>{ //want to create employee details
        const inventory = new Inventory(req.body)       
        inventory.save()//save schema
        .then(result => {   // async tasks 
            res.status (201).json({
                message: "inventory created" ,
                createdInventory: inventory
                
            })
        })
        .catch(error => {
            res.status(400).json({Error: error})
        })
    
    })
 

    module.exports=router