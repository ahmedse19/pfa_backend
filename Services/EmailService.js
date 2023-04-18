const nodemailer = require("nodemailer");
require("dotenv").config();
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "fnewonfiwenfonwnf@outlook.com",
    pass: "y6?zQ?U^j*H5zS$",
  },
});

// await transporter
//   .sendMail({
//     from: "fnewonfiwenfonwnf@outlook.com", // sender address
//     to: "ahmed.semlali@usmba.ac.ma", // list of receivers
//     subject: "Hello ", // Subject line
//     text: "Hello world?", // plain text body
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

console.log(process.env.PORT);
