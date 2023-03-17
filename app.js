const express = require("express");
const fs = require("fs");
const router = require("./routes/Router.js");
const bodyparser = require("body-parser");

const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
app.use(bodyparser.json());
app.use(express.json());
app.use("/", router);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const testemail = async () => {
//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     service: "hotmail",

//     auth: {
//       user: "fnewonfiwenfonwnf@outlook.com",
//       pass: "y6?zQ?U^j*H5zS$",
//     },
//   });

//   await transporter
//     .sendMail({
//       from: "fnewonfiwenfonwnf@outlook.com", // sender address
//       to: "ahmed.semlali@usmba.ac.ma", // list of receivers
//       subject: "Hello ", // Subject line
//       text: "Hello world?", // plain text body
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get("index", (req, res) => {
//   res.send("hi");
// });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
