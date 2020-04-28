//code mainly done by Mikhail Timotev

var http = require('http'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride =  require('method-override'),
    express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    expAutoSan = require('express-autosanitizer');


//dotenv is used for reading the .env MongoDB URL
const dotenv = require('dotenv');
dotenv.config();

var app = express();
var port = process.env.PORT || 3000;

//setting up the product controller
var productCtrl = require('./controller/product-controller');

//using ejs as view engine
app.set('view engine', 'ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layout');
app.use(expressLayouts);

//pointing the client folder view
app.use(express.static('clientView'));
app.use(bodyParser.urlencoded({extended: true}));

//method override will allow me to send a request with method attached
app.use(methodOverride('_method'));

//the home page route
const startRouter = require('./router/home');

//the router for all requests
const productRouter = require('./router/routes');

app.use('/', startRouter);
app.use('/product', productRouter);

//setting up clientViews
app.set('clientView', __dirname + '/public');

//using this library for sanitazing potencially dangerous input 
app.use(expAutoSan.allUnsafe);


app.listen(port, function() {
    console.log("Listening on Port: " + port)
    console.log(process.env.MONGO_DB_URL)
});

//connecting to the database with mongoose
mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});