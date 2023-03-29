const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const Signup = require ('../models/signup')
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

router.post('/getproduct' , async (req,res) => {
    try{
        // Signup.find({mobile:req.body.mobile}).select().exec().then(doc =>{
        //     console.log(doc)            
        // })
        const productInfo = await Product.find()
         var product = productInfo.filter(data=>{
            return data.mobile == req.body.mobile
         })
        res.status(200).json({
            count: product.length , 
            ProductInfo: product
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }   
})

router.get('/products', async (req,res) =>{ 
    try{  
    
         
        
        const products = await Product.find({})  // async makes a function return a Promise
                                                 //await makes a function wait for a Promise
        res.status(200).json({
            Totalproducts : products.length,   // length of the products in schema
            products
        })
    }catch (error) {
        res.status(400).send(error)
    } 
    })



router.get('/getbyName/:name',async(req,res)=>{      
    try{
        const product= await Product.find({name:req.params.name})
        if(!product){
            res.status(404).send({error: "product not found"})
        }
        res.status(400).json({
            Totalproducts:product.length,
            product})
    }catch(error){
        res.status(401).json({error})
        console.log(error)    //console .log outputs the message to web console
    }
});

router.delete('/deleteProduct/:prodId' , async (req,res) => {
    const productid = req.params.prodId
  try{
      const itemInfo = await Product.deleteOne({prodId : productid})
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
    const allowedUpdates= ['imgurl','prodId','name','description','qnt','price','color','size','thick','quality','region','date','manufacturername','PhoneNumber']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const product=await Product.findOne({_id:req.params.id}) // finding the product to be updated
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