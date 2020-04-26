//code mainly done by Mikhail Timotev

var http = require('http'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride =  require('method-override'),
    express = require('express'),
    cors = require('cors'),
    fs = require('fs'),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    expAutoSan = require('express-autosanitizer');



const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./')
var app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var productCtrl = require('./controller/product-controller');

app.set('views',__dirname +'/views');
app.set('layout', 'layout');
app.use(express.static('clientView'));
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use('/', require('./router/home'));
app.use(require('./router/routes'));

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(expAutoSan.allUnsafe);

app.listen

server.listen(port, function() {
    console.log("Listening on Port: " + port)
    console.log(process.env.MONGO_DB_URL)
});

mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});