const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(bodyParser.json());

//import routes
const employeesRoute = require('./routes/employees');
const usersRoute = require('./routes/users');
//const customersRoute = require('./routes/customers');
const authsRoute = require('./routes/auth');
const salesItemRoute = require('./routes/salesItem');
const priceQuoteRoute = require('./routes/priceQuote');
const cancelpriceQuoteRoute = require('./routes/cancelpriceQuote');

app.use('/cancelpricequote',cancelpriceQuoteRoute);
app.use('/pricequote',priceQuoteRoute);
app.use('/salesItem', salesItemRoute);
app.use('/user', usersRoute);
//app.use('/customer', customersRoute);
app.use('/employee', employeesRoute);
app.use('/auth', authsRoute);


// routes
app.get('/',(req,res) => {
    res.send('We are on home');
});

// Connect DB
mongoose.connect(process.env.DB_CONNECTION,
{ 
    useUnifiedTopology: true ,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () =>{
    console.log("DB connected");
});
mongoose.connection.on('disconnected', () =>{
    console.log("DB disconnected");
});

// server listening port
app.listen(3001);