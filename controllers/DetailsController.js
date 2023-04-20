const { getModels } = require("../routes/databaseCon.js");
const jwt = require("jsonwebtoken");

module.exports = {
  getAdminDetails: async (req, res) => {
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
    res.status(200).json({
      message: "user found",
      data: {
        id: user.Id_Admin,
        name: user.Name,
        email: user.Email,
      },
    });
  },
  getClientDetails: async (req, res) => {
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
    console.log(user);
    res.status(200).json({
      message: "user found",
      data: {
        id: user.Id_client,
        name: user.Name,
        email: user.Email,
        vehicule: user["Véhicule"],
        immatriculation: user.N_immatriculation,
        solde: user.Solde,
        methodePaiment: user["Méthode_paiment"],
      },
    });
  },
  getMaps: async (req, res) => {
    const parkings = await getModels().parking_lot.findAll();
    console.log(parkings);
    res.status(200).json({
      message: "parkings found",
      data: {
        parkings: parkings,
      },
    });
  },
};
