var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
//password + salt = very unique thing - this is what bcrypt does
var SALT_WORK_FACTOR = 10;
//constants should be uppercase
//look up rainbow tables, hashing, password salts, brute force attacks

var adminSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

adminSchema.pre('save', function(next){
    var admin = this;
    if(!admin.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        becrypt.hash(admin.password, salt, function(err, hash){
            if(err) return next (err);
            admin.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};
//creates a prototype function, can then call user.comparePassword, candidatepassword is their password
module.exports= mongoose.model('Admin', adminSchema);