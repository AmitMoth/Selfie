var express = require('express'),
    mongoose = require('mongoose');
    bodyParser = require('body-parser');
    cookieParser=require('cookie-parser');
var cors=require('cors');
var port = process.env.PORT || 3000;

var MongoUrl = 'mongodb://amitkv:amitkv@ds113606.mlab.com:13606/dbmyselfie';
var LocalMongoUrl = 'mongodb://localhost:27017/dbmyselfie';
//connect to mongooseDB// local: 
mongoose.connect(MongoUrl,{useMongoClient: true});
//on connection
mongoose.connection.on('connected',()=>{
console.log('connected to mongodb');
});

mongoose.connection.on('error',(err)=>{
    if(err)
        {
            console.log('mongodb can not connected');
        }
});

var User=require('./Models/userModels');

var app=express();
app.use(cors());
app.use(bodyParser.urlencoded({
 	extended: true
    }));
app.use(bodyParser.json());
app.use(cookieParser());

userRouter = require('./Routes/userRoutes')(User);
app.use('/api', userRouter);
app.get('/', function (req, res) {
 res.send('Welcome to mysalfies app');
});

     
app.listen(port, function () {
    console.log('Runnig port:' + port);
});
