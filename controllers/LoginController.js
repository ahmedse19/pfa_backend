const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getModels } = require("../routes/databaseCon.js");

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
            { expiresIn: "15m" }
          );
          res.json({
            message: "logged in successfully",
            data: {
              email: email,
              accessToken: accessToken,
            },
          });
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
            { expiresIn: "5m" }
          );
          res.json({
            message: "logged in successfully",
            data: {
              email: email,
              accessToken: accessToken,
            },
          });
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
        });
        res.status(201).json({
          message: "user created successfully",
        });
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
};
