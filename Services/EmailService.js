const nodemailer = require("nodemailer");
require("dotenv").config();
// create reusable transporter object using the default SMTP transport

const verificationCodes = new Map();
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});
module.exports = {
  sendEmail: async (username, email, code) => {
    await transporter
      .sendMail({
        from: process.env.Email, // sender address
        to: email, // list of receivers
        subject: "Please verify your email", // Subject line
        html: `Dear ${username},<br><br>

Thank you for registering with our service. To complete the registration process, please verify your email address by entering the following code on the verification page:<br><br>
    
Verification Code:     <span style="color:red">${code}</span><br><br>
    
Please note that this code will expire in 24 hours. If you do not verify your email address within this time frame, you will need to request a new verification code.<br><br>
    
If you did not register for our service, please ignore this email. If you have any questions or concerns, please do not hesitate to contact our support team at ParkWise@support.com<br><br>
    
Best regards,<br><br>

ParkWise LLC`,
      })
      .then((res) => {
        console.log(res);
        verificationCodes.set(email, code);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  verificationCodes,
};
