const bcrypt = require('bcryptjs');
const Signup = require('../models/signup')
const jwt = require('jsonwebtoken')


const register = (req,res, next) => {
    bcrypt.hash(req.body.Password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
            let signup = new Signup ({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                mobile: req.body.mobile,
                Email: req.body.parse,
                Password: req.body.Password
            })
        signup.save().then(signup => {
            res.json({
                message: 'User added successfully'
        }).catch(error => {
            res.json({
                message: 'An error occured!'
        })
    })
    })
})
         
}