var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var path = require('path');
var passport = require('passport');


router.get("/", function(req,res,next){
    console.log("getting here");
    //if(req.isAuthenticated()){
        res.sendFile(path.resolve(__dirname, '../views/routes/input.html'));
    //}
});

module.exports = router;