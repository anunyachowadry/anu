const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')


const Shipper = require('../models/shipper')

router.post('/addshipper' , async (req,res) => {
    const raw = new Shipper(req.body)
    try{
        const rawInfo = await raw.save()
        res.status(201).json({
            ShipperInfo:rawInfo
        })
    
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
   
})

router.get('/getshipper' , async (req,res) => {
    try{
        const rawInfo = await Shipper.find()
        res.status(200).json({
            count: rawInfo.length , 
            ShipperInfo: rawInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }   
})

router.delete('/delete/:Mobile' , async (req,res) => {
    const productid = req.params.Mobile
  try{
      const itemInfo = await Shipper.deleteOne({Mobile : productid})
      res.status(201).json({ 
          message: 'Product has been deleted successfully', itemInfo
      })
  
  }catch(err){
      console.log(err)
      res.status(400).json({err})
  } 
})

router.put('/editShipper/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= ['Name','Mobile','Address','Truck','Trucknumber','Truckimage','Licence','Aadhar','Pan']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const product=await Shipper.findOne({_id:req.params.id}) // finding the product to be updated
        if(!product){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => product[update] =req.body[update]) //updating the value
                    
            await product.save() 
            res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router