const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Signup = require('../models/signup');
const express  = require('express')
const passwordResetToken = require('../models/resettoken');
const router = new express.Router()


    router.post('/getsignupdetail' , async (req,res) => {
    if (!req.body.Email) {
    return res
    .status(500)
    .json({ message: 'Email is required' });
    }
    const user = await Signup.findOne({
    Email:req.body.Email
    });
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Email does not exist' });
    }
    var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
    res.status(200).json({ message: 'Reset Password successfully.' });
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
    //   port: 465,
      auth: {
        user: 'anunyachowdary125@gmail.com',
        pass: 'jwnikjzjlndbwwtq'
      }
    });
    var mailOptions = {
    to: req.body.Email,
    from: 'anunyachowdary125@gmail.com',
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://localhost:4200/forgotPassword/' + resettoken.resettoken + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
    })
    })
    }),

module.exports = router