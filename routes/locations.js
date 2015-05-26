var express = require('express');
var router = express.Router();

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

module.exports = router;
