const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')


const Product = require('../models/product')

router.post('/addproduct' , async (req,res) => {
    const product = new Product(req.body)
    try{
        const productInfo = await product.save()
        res.status(201).json({
            ProductInfo:productInfo
        })
    
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
   
})

router.get('/getproduct' , async (req,res) => {
    try{
        const productInfo = await Product.find()
        res.status(200).json({
            count: productInfo.length , 
            ProductInfo: productInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }   
})
router.delete('/deleteProduct/:Number' , async (req,res) => {
    const productid = req.params.Number
  try{
      const itemInfo = await Product.deleteOne({Number : productid})
      res.status(201).json({ 
          message: 'Product has been deleted successfully', itemInfo
      })
  
  }catch(err){
      console.log(err)
      res.status(400).json({err})
  } 
})

router.put('/editProduct/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= ['image','Number','Name','Description','Quantity','Price']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const product=await Product.findOne({_id:req.params.id}) // finding the product to be updated
        if(!product){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => product [update] =req.body[update]) //updating the value
                    
            await product.save() 
            res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
});




module.exports = router