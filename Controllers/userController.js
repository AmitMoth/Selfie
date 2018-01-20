var express=require('express');
var responseObject=require('../Config/commonUtil');
var isNullOrEmpty = require('is-null-or-empty');
var resData;
var userContrller=function(User){
 var post=function(req,res){
     //console.log('++++++++++++++++++signup');
     var user=new User(req.body);
     res.setHeader('Access-Control-Allow-Methods', 'POST');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     if(!responseObject.ValidateEmail(req.body.emailid))
     {
        res.status(400);
        resData=responseObject.CustomResponse("400","Please enter valid emailid",null);
        res.json(resData);
     }
     if(!isNullOrEmpty(req.body) && !isNullOrEmpty(req.body.password))
     {
         user.save(user);
         res.status(201);
         resData=responseObject.CustomResponse("201","Successfull signup!",user);
         res.json(resData);
     }
     else if(isNullOrEmpty(req.body.emailid) || isNullOrEmpty(req.body.password))
     {
        res.status(400);
        resData=responseObject.CustomResponse("400","Please provide emailid or password",null);
        res.json(resData);
     }
     else{
         res.status(502);
         resData=responseObject.CustomResponse("502","Bad Gateway",null);
         res.json(resData);
     }
 }

 var getByEmailID = function (req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log('get');
    var query = {};
    if (!isNullOrEmpty(req.query.emailid) && !isNullOrEmpty(req.query.password)) {
        query.emailid = req.query.emailid,
        query.password=req.query.password;
    User.find(query,{ __v:0},function(err, Users){
        if (err)
            res.status(500).send('Somthig error in api');
            if(Users.length>0)
            {
                res.status(200);
                resData=responseObject.CustomResponse("200","Users record",Users);
                res.json(resData);
            }
            else
             {
                res.status(404);
                resData=responseObject.CustomResponse("404","Invalid credential! Please try again",Users);
                res.json(resData);
            }
    });
}
    else
    {
        res.status(404);
        resData=responseObject.CustomResponse("404","Invalid userid or password",null);
        res.json(resData);
    }
}
var get = function (req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log('get');
    var query = {};
    User.find(query,{ __v:0},function(err, Users){
        if (err)
            res.status(500).send('Somthig error in api');
            if(Users.length>0)
            {
                res.status(200);
                resData=responseObject.CustomResponse("200","Users record",Users);
                res.json(resData);
            }
            else
             {
                // res.status(204);
                resData=responseObject.CustomResponse("404","Not Found",null);
                res.json(resData);
            }
    });
}

// var getByEmailId=function(res,req){
//    res.setHeader('Access-Control-Allow-Methods', 'GET');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    console.log('emailid------------------');
//    if(!responseObject.ValidateEmail(req.body.emailid) && !isNullOrEmpty(req.body.password))
//    {
//           res.status(400);
//           resData=responseObject.CustomResponse("400","Invalid emailid or password!",null);
//           res.json(resData);
//    }
//    else
//    {
//        var query = {};
//        User.find(query,function(err,users){
//          if(err)
//           {
//            res.status(404);
//            resData=responseObject.CustomResponse("404","Bad Request!",null);
//            res.json(resData);
//           }
//        res.status(200);
//        resData=responseObject.CustomResponse("200","Login successfull!",user);
//        res.json(resData);
//    })
//    console.log('emailid----------------');

// }}

 return {
    post: post,
    get:get,
    getByEmailId:getByEmailID
}
};


module.exports=userContrller;