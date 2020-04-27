//code mainly done by Mikhail Timotev

var http = require('http'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride =  require('method-override'),
    express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    expAutoSan = require('express-autosanitizer');



const dotenv = require('dotenv');
dotenv.config();

var app = express();
var port = process.env.PORT || 3000;
var productCtrl = require('./controller/product-controller');

app.set('view engine', 'ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layout');
app.use(expressLayouts);

app.use(express.static('clientView'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));
const startRouter = require('./router/home');
const productRouter = require('./router/routes');

app.use('/', startRouter);
app.use('/product', productRouter);
app.set('clientView', __dirname + '/public');


app.use(expAutoSan.allUnsafe);


app.listen(port, function() {
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