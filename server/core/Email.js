/**
 * 
 */
'use strict';

const nodemailer = require('nodemailer');
const Config = require('./Config');

class Email {
    constructor(to, subject, text, html) {
        this.config = {
            service: '126',
            auth: {
                user: Config.EMAIL_SERVER,
                pass: Config.EMAIL_PWD            
            }
        };
        this.mailOptions = {
            from: Config.EMAIL_SERVER,
            to: to,
            subject: subject,
            text: text,
            //html: html
        };
        this._send();
    }

    _send() {
        let transporter = nodemailer.createTransport(this.config);
        transporter.sendMail(this.mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            transporter.close();
        });
    }

}

module.exports = Email;