var commonUtil = {

  CustomResponse:function(errorcode,message,userObject){
    var ObjectType=Object.create(new Object());
    ObjectType.errorcode=errorcode;
    ObjectType.message=message;
    ObjectType.userdata=userObject;
    return ObjectType;
},
 ValidateEmail:function validateEmail(email)
 {
  var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (reg.test(email)){
  return true; }
  else{
  return false;
  }
 }
};
module.exports=commonUtil;