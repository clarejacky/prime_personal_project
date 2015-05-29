var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Admin = require('./models/admin');

var routes = require('./routes/index');
var locations = require('./routes/locations');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 //If user is unauthorized, they cannot access private folder
//app.use(function(username){
//  if (!username){
//    express.static(path.join(__dirname, 'public'));
//  }
//  else
//    express.static(path.join(__dirname, 'private'));
//    express.static(path.join(__dirname, 'public'));
//});

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());
//
passport.serializeUser(function(user, done){
  done(null, user.id);
});
//
////sticks it in a cookie and does encryption
//
passport.deserializeUser(function(id, done){
  Admin.findById(id, function (err, user){
    if (err) done(err);
    done(null, user);
  })
});
//
passport.use('local', new localStrategy({
      passReqToCallback: true,
      usernameField: 'username'
    },
    function(req, username, password, done){
      Admin.findOne({username: username}, function(err, user){
        if (err) {
          console.log(err);
          next(err);
        }
        if(!user) {
          console.log("User not found");
          return done(null, false, {message: 'Incorrect username or password'});
        }
        user.comparePassword(password, function(err, isMatch){
          if (err) {
            console.log(err);
            next(err);
          }
          if(isMatch){
            console.log("User found, correct match");
            return done(null, user);
          }
          //will run local version of passport - here is the user we found
          else {
            console.log("Incorrect username or password");
            done(null, false, {message: 'Incorrect username or password'});
          }
        })
      })
    }
));

app.use('/', routes);
app.use('/locations', locations);
app.use('/admin', admin);

var mongoURI = "mongodb://localhost:27017/locations";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
