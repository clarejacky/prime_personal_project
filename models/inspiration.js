var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InspirationSchema = new Schema({
    name: String,
    imageurl: String,
    description: String

});
//if address is not inputed cannot make google map
module.exports = mongoose.model('Inspiration', InspirationSchema);