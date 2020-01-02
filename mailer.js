const nodemailer = require('nodemailer');
require('dotenv').config();

const mail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: '"Events access 👻" <lodashed@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Event Token', // Subject line
    text: `Here is your event token: ${token}` // plain text body
    // html: '<b>Hello world?</b>' // html body
  });

  await transporter.sendMail(info, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent');
    }
  });
};

module.exports = mail;
