var express = require('express');
var router = express.Router();
var Location = require('../models/location');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Location.find(function(err, locations){
    res.json(locations);
    console.log(locations);
  })
});

router.post('/', function(req, res, next){
  Location.create(req.body, function(err, post){
    res.json(post);
    console.log(post);
  })
});

router.get('/search', function(req, res, next){
  console.log(req.query);
  //req.query = new RegExp(req.query, "i");
  //console.log(req.query);
  Location.find(req.query,function (err, locations) {
        if (err) return next(err);
        res.json(locations);
      });
});

module.exports = router;
