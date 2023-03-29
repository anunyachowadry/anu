const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')




const Manufacturer = require('../models/manufacturer')



router.post('/adddata' , async (req,res) => {
    const signup = new Manufacturer(req.body)
    try{
        const sinInfo = await signup.save()
         
        res.status(201).json({
            SignData:sinInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }    
});



router.get('/getdata' , async (req,res) => {
    try{
        const sinupInfo = await Manufacturer.find()
        res.status(200).json({
            count: sinupInfo.length , 
            SignData: sinupInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
});
router.put('/edits/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= ['Firstname','Lastname','mobile','Address','Email','Company','Location','UserType']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const signs=await Manufacturer.findOne({_id:req.params.id}) // finding the product to be updated
        if(!signs){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => signs [update] = req.body[update]) //updating the value
                    
            await signs.save() 
            res.send(signs)
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports = router