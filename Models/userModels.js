const uuidV1 = require('uuid');
var mongoose=require('mongoose');
Schema=mongoose.Schema;

var userModel=new Schema({
  userid:{type:String,default:uuidV1()},
  emailid:{type:String,required:true},
  firstname:{type:String,required:true},
  lastname:{type:String},
  password:{type:String,required:true},
  age:{type:Number},
  location:{type:String},
  profession:{type:String},
  imageurl:{type:String},
 createdon:{type:Date,default:new Date()}
});

module.exports=mongoose.model('user',userModel);