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
          const { Name } = getModels().client.findOne({
            where: { Email: email },
          });
          sendEmail(Name, email, code); // needs exception handling !!!!!
          res.status(200).json({
            message: "Email sent",
          });
          verificationCodes.set(email, code); // need to check concurrency to the map
          console.log(verificationCodes);
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
