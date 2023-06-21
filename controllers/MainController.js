const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getModels } = require("../routes/databaseCon.js");

module.exports = {
  forwardRequest: async (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "no image found" });
    } else {
      console.log(req.file);
      const id = req.file.filename;
      console.log(req.file.buffer);
      const { path, mimetype, filename } = req.file;

      const formData = new FormData();
      formData.append("image", fs.createReadStream(path), {
        filename,
        contentType: mimetype,
        knownLength: req.file.size,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:4000/detectlicenseplate",
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data.response);
          res.json(response.data);
        })
        .catch((error) => {
          console.log(error);
          res.send("error");
        });
    }
  },
  getParkings: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let email;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        email = decoded.email;
      }
    });

    const user = await getModels().administrateur.findOne({
      where: { Email: email },
    });
    if (user === null) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const reservations = await getModels().parking_lot.findAll({
      where: {
        Id_Admin: user.Id_Admin,
      },
    });
    res.status(200).json({
      message: "user found",
      data: reservations,
    });
  },
  getReservations: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let email;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        email = decoded.email;
      }
    });

    const user = await getModels().client.findOne({
      where: { Email: email },
    });
    if (user === null) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const reservations = await getModels().reservation.findAll({
      where: {
        Id_client: user.Id_client,
      },
    });
    res.status(200).json({
      message: "user found",
      data: reservations,
    });
  },
};
