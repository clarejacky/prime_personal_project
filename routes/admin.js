var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var path = require('path');
var passport = require('passport');


//router.get("/", function(req,res,next){
//    console.log("getting here");
//    if(req.isAuthenticated()){
//        res.sendFile(path.resolve(__dirname, '/public/views/routes/resource.html'));
//        console.log("authenticated");
//    }
//});

router.post('/',
    passport.authenticate('local'), function(req,res, next){
        console.log(req.user);
        res.send(req.user);
    });

module.exports = router;