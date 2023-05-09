const { sendEmail, verificationCodes } = require("../Services/EmailService.js");
const jwt = require("jsonwebtoken");
const { getModels } = require("../routes/databaseCon.js");

module.exports = {
  ResendEmail: async (req, res) => {
    const code = Math.floor(Math.random() * 1000000);

    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
        } else {
          email = decoded.email;
          const code = Math.floor(Math.random() * 1000000);
          getModels()
            .client.findOne({
              where: { Email: email },
            })
            .then((res) => sendEmail(res.dataValues.Name, email, code));

          // needs exception handling !!!!!
          res.status(200).json({
            message: "Email sent",
          });
          verificationCodes.set(email, code); // need to check concurrency to the map
          //console.log(verificationCodes);
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "something went wrong", // Server Internal Error
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
        } else {
          email = decoded.email;

          const code = req.body.code;

          if (!verificationCodes.has(email)) {
            res.json({
              message: "no verification code found",
            });
          } else if (verificationCodes.get(email) === Number(code)) {
            res.status(200).json({
              message: "Email Verification complete",
            });
            verificationCodes.delete(email);
            getModels().client.update(
              { valide: true },
              { where: { Email: email } }
            );
          } else {
            res.json({
              message: "Invalid Verification Code",
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "something went wrong", // Server Internal Error
      });
    }
  },
};
