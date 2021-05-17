const nodemailer = require('nodemailer');
require('dotenv').config()

const cowin_site = "https://www.cowin.gov.in/home";

function send_email(email, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILER_ID,
          pass: process.env.MAILER_PASSWD
        }
      });

    var mailOptions = {
        from: 'COWIN_ALERTER@grabyourslot.com',
        to: email,
        subject: 'Vaccines Found',
        text: message
    };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

function send_message(telegram_id, email, district, type, bot) {
    if (type == "slots") {
        let message = `Hi, We found new slots open in the ${district} district. 
        Hop onto the site ${cowin_site} quickly to grab your slot`;    
    } else {
        let message = `Hi, the dates on the website has changed. 
        This might mean that there are new slots in the ${district} district.
        Hop onto the site ${cowin_site} quickly to check if there are new slots`;
    }
    console.log(message);
    bot.sendMessage(
        telegram_id,
        message);

    if (email != null) {
        send_email(email, message);
    }
}

module.exports.send_email = send_email;
module.exports.send_message = send_message;