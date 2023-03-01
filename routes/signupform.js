const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs');


const Signup = require('../models/signup')

//----this is for signup get method----//
router.get('/getsignupdetails' , async (req,res) => {
    try{
        const sinInfo = await Signup.find()
        res.status(200).json({
            count: sinInfo.length , 
            SignupInfo: sinInfo
        })
    
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    }
   
})


//---this is for signup post method ----//

router.post('/addsignupdetails', (req, res, next)=>{
    console.log("User profile is called")

    const signup = new Signup({
        _id: new mongoose.Types.ObjectId,
       
        Password: req.body.Password,
        mobile: req.body.mobile,
      
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        City:req.body.City,
        Email: req.body.Email,
        UserType: req.body.UserType,
        Pincode: req.body.Pincode,
        Street: req.body.Street,
        State:req.body.State,
        Company: req.body.Company,
        ManufacturerID: req.body.ManufacturerID   

    });
     var mobile = req.body.mobile;
  //first check if user is alredy existed 
  Signup.findOne({mobile:mobile}).select().exec().then(doc =>{

    if(doc == null){ //if no user found then create new user
        signup.save().then( result=> {
            res.status(200).json({
               message: "User signed up susccessfully",
               status:"success",
               Id: result._id,
               selectType:result.role
            });  
     }) .catch(err => {
        console.log(err);
        res.status(500).json({
             error: err,
             status:"faileds"
              });
         })
    }else{
        res.status(200).json({message:"user aleredy exists",
                              status:"failed"
        })
    }
    });
});

//-----this is for profile edit functionality----//

router.put('/editProfile/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= [
        'Firstname',
        'Lastname',
        'mobile',
        'Email',
        'Password',
        'City',
        // 'UserType',
        'Street',
        'State',
        'Company',
        // 'ManufacturerID',
        'Pincode']  // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const signup = await Signup.findOne({_id:req.params.id}) // finding the product to be updated
        if(!signup){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => signup[update] =req.body[update]) //updating the value
                    
            await signup.save() 
            res.send(signup)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router
