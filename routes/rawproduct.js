const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')


const Raw = require('../models/raw')

router.post('/addraw' , async (req,res) => {
    const raw = new Raw(req.body)
    try{
        const rawInfo = await raw.save()
        res.status(201).json({
            RawInfo:rawInfo
        })
    
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
   
})

router.get('/getraw' , async (req,res) => {
    try{
        const rawInfo = await Raw.find()
        res.status(200).json({
            count: rawInfo.length , 
            RawInfo: rawInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }   
})

router.delete('/delete/:Number' , async (req,res) => {
    const productid = req.params.Number
  try{
      const itemInfo = await Raw.deleteOne({Number : productid})
      res.status(201).json({ 
          message: 'Product has been deleted successfully', itemInfo
      })
  
  }catch(err){
      console.log(err)
      res.status(400).json({err})
  } 
})

router.put('/editRaw/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= ['Image','Number','Name','color','size','region','date']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const product=await Raw.findOne({_id:req.params.id}) // finding the product to be updated
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