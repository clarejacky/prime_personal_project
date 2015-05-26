/**
 * Created by ClareJacky on 5/26/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name: { type: String, required: true },
    fitnessType: { type: String, required: true },
    website: String,
    hours: String,
    address: String,
    mission: String

});
//if address is not inputed cannot make google map
module.exports = mongoose.model('Location', LocationSchema);