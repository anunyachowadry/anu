const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')


const signup = require('../models/signup')

// router.post('/addlogin', async (req, res) => {
//     const login = new Login(req.body)

//      try{
//         const loginInfo = await login.save()
//         res.status(201).json({
//              LoginInfo:loginInfo
//     })

//      }catch(err){
//          console.log(err)
//          res.status(400).json({err})
//      }
// })

    router.get('/getlogin/:key', async (req, res) => {
        const filter = req.params.key
        try {
            const signupInfo = await signup.findOne({Email:filter})
            res.status(200).json({
                count: signupInfo.length,
                SignupInfo: signupInfo
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ err })
        }    
    })

    //login compare
    router.post('/addlogin',async(req,res,next)=>{
        var email = req.body.email ;
        
        console.log(email)
        signup.findOne({Email:email}).select().exec().then( doc =>{
            console.log(email)  
             
             var em = req.body.email;
             var pass = req.body.password;
             console.log(em)
             console.log(pass)
             console.log(doc)
    
             if(em == doc.Email && pass == doc.Password){
                
                 res.status(200).json({Authentication :doc._id,
                             message:"success",
                             status:"success",
                            Type:doc.Type,
                            Email:doc.Email,
                            Password:doc.Password,
                            Firstname:doc.Firstname,
                            Lastname:doc.Lastname,                          
                            mobile:doc.mobile,
                            Street:doc.Street,
                            City:doc.City,
                            State:doc.State,
                            Pincode:doc.Pincode,
                            UserType:doc.UserType,
                            docId:doc._id                            
                        })               
                    }
        
                 else{
                 res.status(400).json({Authentication:"failed to login check email and password",
                        message:"failed",
                        status:"failed",              
                        
                });              
             }   
    
         }).catch(err =>{
             console.log(err);
             res.status(500).json({error :err,
                status:"failed"
             });
         });
     
    });


    router.put('/editProfile/:id',async(req,res) => {
        const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
        const allowedUpdates= ['Firstname','Lastname','mobile','Email','Password','Address']  // updates that are allowed
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
        if(!isValidOperation) {
            return res.status(400).json({ error : 'invalid updates'})
        }
        try{  // try  catch error is to catch the errors in process
            const signup=await signup.findOne({_id:req.params.id}) // finding the product to be updated
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


    router.put('/productData/:_id' , async (req,res) => {
        const productid = req.params._id
        const allowedUpdates = ['Firstname','Lastname','mobile','Email','Password','Address']
        const signupUpdates = Object.keys(req.body)
        const updatesOps = {}
    
        signupUpdates.forEach(arr => {
            if(!allowedUpdates.includes(arr)){
                res.status(400).json({
                    message: "Invalid Update Request",
                })
                return
            }
              updatesOps[arr] = req.body[arr]
        })
      try{
          const SignupInfo = await signup.findOneAndUpdate({ productid, updatesOps})
          res.status(201).json({ 
              message: "Product data has been updated successfully" ,
              SignupInfo
          })
      }catch(err){
          console.log(err)
          res.status(400).json({err})
      } 
    })





module.exports = router