const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const Dealer = require('../models/dealer')
router.post('/adddealer' , async (req,res) => {
    const dealer = new Dealer(req.body)
    try{
        const dealerInfo = await dealer.save()
        res.status(201).json({
            dealerInfo:dealerInfo
        })
    
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    } 
})
router.get('/getdealer' , async (req,res) => {
    try{
        const dealerInfo = await Dealer.find()
        res.status(200).json({
            count: dealerInfo.length , 
            dealerInfo: dealerInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }  
})
// router.delete('/deletedealer/:id' , async (req,res) => {
//     const dealerid = req.params._id
//   try{
//       const dealerInfo = await Dealer.deleteOne({_id: dealerid})
//        return res.status(201).json({ 
//           message: 'Selected dealer has been deleted successfully', dealerInfo
//       })
  
//   }catch(err){
//       console.log(err)
//       res.status(400).json({err})
//   }
 
// })


router.put('/editdealer/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= [,'Firstname','Lastname','mobile','Address','Email','Company','UserType','Location']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const dealer=await Dealer.findOne({_id:req.params.id}) // finding the product to be updated
        if(!dealer){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => dealer [update] =req.body[update]) //updating the value
                    
            await dealer.save() 
            res.send(dealer)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router