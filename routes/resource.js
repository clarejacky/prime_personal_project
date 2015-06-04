var express = require('express');
var router = express.Router();
var Inspiration = require('../models/inspiration');
var path = require('path');
var passport = require('passport');

router.post('/', function(req, res, next){
    Inspiration.create(req.body, function(err, post){
        res.json(post);
        console.log(post);
    })
});

router.get('/', function(req, res, next) {
    Inspiration.find(function(err, inspirations){
        res.json(inspirations);
        console.log(inspirations);
    })
});


module.exports = router;

