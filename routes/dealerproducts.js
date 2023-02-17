const express  = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const multer=require('multer')
const Dealerproduct = require('../models/dealerproduct')

// router.post('/addproducts' , async (req,res) => {
//     const rawproduct = new Rawproduct(req.body)
//     try{
//         const rawproductInfo = await rawproduct.save()
//         res.status(201).json({
//             RawproductInfo:rawproductInfo
//         })
//     }catch(err){
//         console.log(err)
//         res.status(400).json({err})
//     } 
// })
router.get('/getproduct' , async (req,res) => {
    try{
        const dealerproductInfo = await Dealerproduct.find()
        res.status(200).json({
            count: dealerproductInfo.length , 
            DealerproductInfo: dealerproductInfo
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err})
    } 
})
//storage 
const Storage = multer.diskStorage ({
    destination: "../uploads",
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    },
});
// multer storage
const upload = multer({
    storage:Storage
}).single('testImage')
//image post method
router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Products ({
                NameoftheStone:req.body.NameoftheStone,
                Style:req.body.Style,
                Size:req.body.Size,
                Color:req.body.Color,
                Dimensions:req.body.Dimensions,
                Capacity:req.body.Capacity,
                Weight:req.body.Weight,
                Description:req.body.Description,
                image:{
                   // data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send('successfully uploaded'))
            .catch((err)=>console.log(err));
        }
    })
})
// get product method
router.get('/getimage', async (req,res) =>{ 
    try{      
        const products = await Products.find({})  // async makes a function return a Promise
                                                 //await makes a function wait for a Promise
        res.status(200).json({
            Totalproducts : products.length,   // length of the products in schema
            all:products
        })
    }catch (error) {
        res.status(400).send(error)
    }
    })


    // anunya post call

    router.post('/addproduct',(req,res,next)=>{ //want to create employee details
        const dealerproduct = new Dealerproduct(req.body)       
        dealerproduct.save()//save schema
        .then(result => {   // async tasks 
            res.status (201).json({
                message: "product created" ,
                createdProduct: dealerproduct
                
            })
        })
        .catch(error => {
            res.status(400).json({Error: error})
        })
    
    })

 
    router.get('/getproduct', async (req,res) =>{ 
        try{  
        
             
            
            const products = await Rawproduct.find({})  // async makes a function return a Promise
                                                     //await makes a function wait for a Promise
            res.status(200).json({
                Totalproducts : products.length,   // length of the products in schema
                products
            })
        }catch (error) {
            res.status(400).send(error)
        } 
        })

module.exports = router
