const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',  // SMTP server for SendGrid
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,  // Your SendGrid API key or username
            pass: process.env.EMAIL_PASSWORD   // Your SendGrid API key or password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
