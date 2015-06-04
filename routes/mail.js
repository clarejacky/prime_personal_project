var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

// Create a SMTP transporter object

router.post('/sendMail', function (req, res, next){
    var email = req.body.senderemail;
    var subject= req.body.subject;
    var messageBody = req.body.emailbody;


        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'buffedmsp@gmail.com',
                pass: 'buffedup'
            }
        });

console.log('SMTP Configured');

// Message object
var message = {

    // sender info
    from: 'buffedmsp@gmail.com',

    // Comma separated list of recipients
    to: 'buffedmsp@gmail.com',

    // Subject of the message
    subject: 'Contact Us', //

    headers: {
        'X-Laziness-level': 1000
    },

    // HTML body
    html: '<h3>Message from: ' + email + '</h3><p> Email Subject: ' + subject + '</p><p>Email Message: ' + messageBody+ '</p>'

};

console.log('Sending Mail');
transporter.sendMail(message, function(error, info) {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
});

    res.send("Mail Sent");
});

module.exports = router;
