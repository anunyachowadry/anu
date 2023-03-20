const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');

//Post Request starts here 
router.post('/post', (req, res, next)=>{
      console.log('mobile place order called');
            //implementing the schema
            const place =new Place({         
                  _id: new mongoose.Types.ObjectId(),
                  
                  Firstname:req.body.Firstname,
                  Lastname:req.body.Lastname,
                  PhoneNumber:req.body.PhoneNumber,
                  Area:req.body.Area,
                  City:req.body.City,
                  State:req.body.State,
                  Email:req.body.Email,
                  Pincode:req.body.Pincode,                
                  OrderItems: req.body.OrderItems,
                });
                place.save()
                .then(result =>{                          
                    res.status(200).json({                            
                        message: 'created order successfully',
                        status:'success',
                        order_id: result.OrderId,
                        docId:result._id
                    });  

                 }).catch(err=>{
                      res.status(500)
                         .json({
                          error :err
                          });
                     })
});



//get all the Mobile Place Orders
router.get('/getAllOrders', (req, res, next)=>{
    
      Place.find({OrderStatus: {$ne: "Delivered"}}).exec()
           .then(docs =>{
               res.status(200).json({
                count: docs.length,
                orders: docs.map(doc =>{
                         return{
                             _id: doc._id,
                            OrderStatus:doc.OrderStatus,
                            OrderDate: doc.OrderDate,
                            
                            OrderData: doc,
                        }           
  
                }) 
  
               });
           })
           .catch(err => {
               res.status(500).json({
                  error: err
               });
           });       
  });




//Get orders by the customer name
router.get('/getAllOrders/:UserName', (req, res, next)=>{
    const UserName = req.params.UserName;
    mobilePlaceOrder.find({Username:UserName}).exec()
         .then(docs =>{
             res.status(200).json({
              count: docs.length,
              orders: docs.map(doc =>{
                return{
                   _id: doc._id,
                    OrderStatus:doc.OrderStatus,
                    OrderDate: doc.OrderDate,
                    OrderData: doc,
             }  
    })
});
})
         .catch(err => {
             res.status(500).json({
                error: err
             });
         });  

});
router.put('/orderStatus/:id',async(req,res) => {
    const updates=Object.keys(req.body)   // keys will be stored in updates => req body field names.
    const allowedUpdates= ['OrderItems'] // updates that are allowed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowedUpdates
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{  // try  catch error is to catch the errors in process
        const place = await Place.findOne({_id:req.params.id}) // finding the product to be updated
        if(!place){ //if user is empty it will  throw error as response
            return res.status(404).json({ message:'Invalid user'})
        }
            updates.forEach((update) => place [update] =req.body[update]) //updating the value
                    
            await place.save() 
            res.send(place)
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports=router