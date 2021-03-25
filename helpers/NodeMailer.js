function sendReceipt(receiverEmail, text){
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'raslegias@gmail.com',
            pass: '0226623647'
        }
    });

    var mailOptions = {
        from: 'raslegias@gmail.com',
        to: `${receiverEmail}`, //'farhantaufiks@gmail.com',
        subject: 'Your Total Payment',
        text: `${text}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' `to ${receiverEmail} with info` + info.response);
    });
}

module.exports = sendReceipt