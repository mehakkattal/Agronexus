require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// CLOUDINARY
const uploadImg = (fileBuffer, publicId) => {
  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      { publicId },

      (error, uploadResult) => {

        if (error) {
          return reject({
            error: "Upload failed",
            details: error
          });
        }

        resolve(uploadResult.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};


// MAIL FUNCTION
const sendMail = async (to, subject, text) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  };

  return await transporter.sendMail(mailOptions);
};


module.exports = {
  uploadImg,
  sendMail
};





















// require('dotenv').config();
// const cloudinary=require('cloudinary').v2
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
//   });

// const uploadImg = (fileBuffer, publicId) => {    
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//             { publicId },
//             (error, uploadResult) => {
//                 if (error) {
//                     return reject({ error: "Upload failed", details: error });
//                 }
//                 else{
//                     resolve(uploadResult.secure_url);
//                 }
//             }
//         );
//         uploadStream.end(fileBuffer);
//     });
// };


// module.exports = {
//     uploadImg
// };
