const { sendMail } = require("../../utilities/helper");

const mail = async (req, res) => {

  try {

    const formData = req.body;

    await sendMail(
      formData.to,
      formData.subject,
      formData.text
    );

    return res.json({
      success: true,
      status: 200,
      message: "Email Sent"
    });

  } catch (error) {

    return res.json({
      success: false,
      status: 500,
      message: error.message
    });
  }
};

module.exports = { mail };




















// let nodemailer = require('nodemailer');

// const mail = async (req, res) => {
//   const formData = req.body || {};

  
//   // console.log("MAIL_USER:", process.env.MAIL_USER)
//   // console.log("MAIL_PASS:", process.env.MAIL_PASS)

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//     }
//   });

//   let mailOptions = {
//     from: process.env.MAIL_USER,
//     to: formData.to,
//     subject: formData.subject,
//     text: formData.text,
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       return res.json({
//         status: 500,
//         success: false,
//         message: "Error sending mail: " + error
//       });
//     }

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Email Sent"
//     });
//   });
// };

// module.exports = { mail };
















// let nodemailer = require('nodemailer');

// const mail = async (req, res) => {
//   const formData = req.body || {};

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//     }
//   });

//   let mailOptions = {
//     from: process.env.MAIL_USER,
//     to: formData.to,
//     subject: formData.subject,
//     text: formData.text,
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       return res.json({
//         status: 500,
//         success: false,
//         message: "Error sending mail: " + error
//       });
//     }

//     console.log('Email sent: ' + info.response);

//     return res.json({
//       success: true,
//       status: 200,
//       message: "Email Sent"
//     });
//   });
// };

// module.exports = { mail };
