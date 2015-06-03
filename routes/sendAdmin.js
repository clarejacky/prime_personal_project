var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');
var path = require('path');
var passport = require('passport');


router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
        console.log("You are logged in");
        res.sendFile(path.resolve(__dirname, "../public/views/admin.html"));
    } else {
        console.log("Your not authenticated");
        res.sendFile(path.resolve(__dirname, "../views/index.html"));
    }

});

module.exports = router;