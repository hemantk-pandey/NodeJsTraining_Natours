const nodemailer = require('nodemailer');
const sendEmail = (options) => {
  //create transporter

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAMEy,
      pass: process.env.EMAIL_PASSWORD,
    },
    //activate in gmail 'less secure app' option
  });
  //define email options
  //send the mail
};
