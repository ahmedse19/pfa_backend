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
      return res.status(400).send("Cannot find user");
    } else {
      try {
        if (await bcrypt.compare(password, user.Password)) {
          const accessToken = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
          );
          res.json({ email: email, accessToken: accessToken });
        } else {
          res.send("Not Allowed");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send();
      }
    }
  },

  LoginClient: async (req, res) => {
    const { email, password } = req.body;
    const user = await getModels().client.findOne({ where: { Email: email } });
    if (user === null) {
      return res.status(400).send("Cannot find user");
    } else {
      try {
        if (await bcrypt.compare(password, user.Password)) {
          const accessToken = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
          );
          res.json({ email: email, accessToken: accessToken });
        } else {
          res.send("Not Allowed");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send();
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
      return res.send("User already exists");
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
          Solde: solde,
          Méthode_paiment: methodePaiment,
        });
        res.status(201).send();
      } catch (e) {
        console.log(e);
        res.status(500).send();
      }
    }
  },
};
