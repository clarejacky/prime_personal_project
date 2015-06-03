var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Admin = require('../models/admin');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
});

//router.post('/', function(req, res, next){
//  Admin.create(req.body, function(err, post){
//    res.json(post);
//    console.log(post);
//  })
//});

router.post('/',
    passport.authenticate('local', {
      successRedirect: '/sendAdmin',
      failureRedirect: '/'
    })
);

module.exports = router;


