const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getModels } = require("../routes/databaseCon.js");
const { sendEmail } = require("../Services/EmailService.js");

const jwtTokensClients = new Map();
const jwtTokensAdmins = new Map();

module.exports = {
  LoginAdmin: async (req, res) => {
    const { email, password } = req.body;
    const user = await getModels().administrateur.findOne({
      where: { Email: email },
    });

    if (user === null) {
      return res.status(400).json({
        message: "user not found",
      });
    } else {
      try {
        if (await bcrypt.compare(password, user.Password)) {
          const accessToken = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );

          res.json({
            message: "logged in successfully",
            data: {
              email: email,
              accessToken: accessToken,
            },
          });

          jwtTokensAdmins.set(email, accessToken);
        } else {
          res.status(401).json({
            message: "password is incorrect",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "something went wrong", // Server Internal Error
        });
      }
    }
  },

  LoginClient: async (req, res) => {
    let k = Date.now();

    const { email, password } = req.body;
    const user = await getModels().client.findOne({ where: { Email: email } });
    if (user === null) {
      return res.status(400).json({ message: "user not found" });
    } else {
      try {
        if (await bcrypt.compare(password, user.Password)) {
          const accessToken = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "50m" }
          );

          res.json({
            message: "logged in successfully",
            data: {
              email: email,
              accessToken: accessToken,
            },
          });
          jwtTokensClients.set(email, accessToken); //tokens persist in the map
        } else {
          res.status(401).json({
            message: "password is incorrect",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "something went wrong", // Server Internal Error
        });
      }
    }
  },
  SignUpClient: async (req, res) => {
    const {
      name,
      email,
      password,
      vehicule,
      immatriculation,
      isBanned,
      solde,
      methodePaiment,
    } = req.body;
    const user = await getModels().client.findOne({
      attributes: ["email"],
      where: { Email: email },
    });
    if (user !== null) {
      return res.json({ message: "user already exists" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await getModels().client.create({
          Name: name,
          Email: email,
          Password: hashedPassword,
          Véhicule: vehicule,
          N_immatriculation: immatriculation,
          isBanned: isBanned,
          licenseplate_dir: "",
          valide: true,
          Solde: solde,
          Méthode_paiment: methodePaiment,
        }); //here  console.log(user.dataValues);
        res.status(201).json({
          message: "user created successfully",
        });
        const code = Math.floor(Math.random() * 1000000);
        try {
          await sendEmail(name, email, code);
        } catch (e) {
          console.log(e);
          console.log("email not sent");
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "something went wrong", // Server Internal Error
        });
      }
    }
  },
  createAdmin: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await getModels().administrateur.create({
        Name: name,
        Email: email,
        Password: hashedPassword,
      });
      res.status(201).json({
        message: "admin created successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "something went wrong", // Server Internal Error
      });
    }
  },
  LogoutClient: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        decode.exp = Date.now();
        res.status(200).json({ message: "logged out successfully" });
      }
    });
  },
};
