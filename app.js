const express = require('express');
const app = express();
const mongoose = require('mongoose')

const bodyparser = require('body-parser')

const signupformRoutes = require('./routes/signupform')
const loginformRoutes = require('./routes/loginform')
const productsRoutes = require('./routes/products')
const dealersRoutes = require('./routes/dealers')
const ordersRoutes = require('./routes/orders')
const shippersRoutes = require('./routes/shippers')
const rawproductRoutes = require('./routes/rawproduct')
const manufacturerRoutes = require('./routes/manufacturer')
const placeordersRoutes = require('./routes/placeorders')

const cors = require('cors')
// mongodb+srv://Mounika:shiny1502@cluster0.9sbybdn.mongodb.net/?retryWrites=true&w=majority
const uri = 'mongodb+srv://Uma:Umaraj09@cluster0.cy5cq2n.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
 mongoose.connect(uri)
.then(response =>{
   console.log('mongodb is connected')
})
.catch(error=>{
   console.log(error)
   console.log("error db is not connected")
});

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors())
app.use('/shippers', shippersRoutes);
app.use('/signupform', signupformRoutes);
app.use('/loginform', loginformRoutes);
app.use('/products', productsRoutes);
app.use('/raw', rawproductRoutes);
app.use('/dealer',dealersRoutes);
app.use('/order',ordersRoutes);
app.use('/manufacturer',manufacturerRoutes);
app.use('/placeorders',placeordersRoutes);

module.exports=app;
