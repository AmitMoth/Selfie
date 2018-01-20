
var express=require('express');
var isNullOrEmpty = require('is-null-or-empty');

var routes=function(User){
  var userRouter=express.Router();
  var userController=require('../Controllers/userController')(User);

  userRouter.route('/signup')
        .post(userController.post);
  userRouter.route('/users')
        .get(userController.get);
userRouter.route('/signin')
        .get(userController.getByEmailId);
 userRouter.use('/:emailid/:password', function (req, res, next) {
		Book.findById(req.params.emailid, function (err, user) {
			if (err)
                        res.status(500).send('Not found');
                      console.log('----------'+user);  
			if (!isNullOrEmpty(user)) {
				req.user = user;
				next();
				res.json(user);
			} else {
				res.status(404).send('no record found');
			}
		});
	});
        return userRouter;
};

module.exports=routes;