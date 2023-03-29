const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');

const Place = require('../models/place');

//Firebase initialization.













//This is the one which is being used now. 












//Post Request starts here 
router.post('/post', (req, res, next)=>{
      console.log('mobile place order called');
      console.log(req.body)
            //implementing the schema
            const place =new Place({
         
                  _id: new mongoose.Types.ObjectId(),
                  
                  Firstname:req.body.Firstname,
                  Lastname:req.body.Lastname,
                  PhoneNumber:req.body.PhoneNumber,
                  Address:req.body.Address,
                  City:req.body.City,
                  State:req.body.State,
                  Email:req.body.Email,
                  Pincode:req.body.Pincode,
                  // grandtotal:req.body.grandtotal,
                
                  OrderItems: req.body.OrderItems,
                  // name:req.body.name,
                  // price:req.body.price,
                  // prodId:req.body.prodId,
                  // qnt:req.body.qnt,
                  // imgurl:req.body.imgurl
                //   OrderStatus: req.body.OrderStatus,
                //   OrderDate: req.body.OrderDate,
                //   OrderId:req.body.OrderId
                  //useNId:req.body.token
                       });
                place.save()
                .then(result =>{
                          
                            res.status(200).json({
                            
                                message: 'created order successfully',
                                status:'success',
                                place: result.PlaceId,
                                docId:result._id
                            
                             });

                   // notifyclientsforplaceorder();   

                 }).catch(err=>{
                      res.status(500)
                         .json({
                          error :err
                          });
                     })



});

router.get('/getOrders', (req, res, next)=>{
    
    Place.find({PlaceStatus: {$ne: "Delivered"}}).exec()
         .then(docs =>{
             res.status(200).json({
              count: docs.length,
              place: docs.map(doc =>{
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

//get all the Mobile Place Orders
router.get('/getAllOrders', (req, res, next)=>{
    
      Place.find({OrderStatus: {$ne: "Delivered"}}).exec()
           .then(docs =>{
               res.status(200).json({
                count: docs.length,
                place: docs.map(doc =>{
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
module.exports=router