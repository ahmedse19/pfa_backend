var DataTypes = require("sequelize").DataTypes;
var _administrateur = require("./administrateur");
var _client = require("./client");
var _facture = require("./facture");
var _parking_lot = require("./parking_lot");
var _parking_spot = require("./parking_spot");
var _reservation = require("./reservation");

function initModels(sequelize) {
  var administrateur = _administrateur(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var facture = _facture(sequelize, DataTypes);
  var parking_lot = _parking_lot(sequelize, DataTypes);
  var parking_spot = _parking_spot(sequelize, DataTypes);
  var reservation = _reservation(sequelize, DataTypes);

  parking_lot.belongsTo(administrateur, { as: "Id_Admin_administrateur", foreignKey: "Id_Admin"});
  administrateur.hasMany(parking_lot, { as: "parking_lots", foreignKey: "Id_Admin"});
  reservation.belongsTo(administrateur, { as: "Id_admin_administrateur", foreignKey: "Id_admin"});
  administrateur.hasMany(reservation, { as: "reservations", foreignKey: "Id_admin"});
  reservation.belongsTo(client, { as: "Id_client_client", foreignKey: "Id_client"});
  client.hasMany(reservation, { as: "reservations", foreignKey: "Id_client"});
  reservation.belongsTo(facture, { as: "Id_facture_facture", foreignKey: "Id_facture"});
  facture.hasMany(reservation, { as: "reservations", foreignKey: "Id_facture"});
  parking_spot.belongsTo(parking_lot, { as: "Id_parking_parking_lot", foreignKey: "Id_parking"});
  parking_lot.hasMany(parking_spot, { as: "parking_spots", foreignKey: "Id_parking"});
  reservation.belongsTo(parking_spot, { as: "Id_spot_parking_spot", foreignKey: "Id_spot"});
  parking_spot.hasMany(reservation, { as: "reservations", foreignKey: "Id_spot"});
  facture.belongsTo(reservation, { as: "Id_reservation_reservation", foreignKey: "Id_reservation"});
  reservation.hasMany(facture, { as: "factures", foreignKey: "Id_reservation"});

  return {
    administrateur,
    client,
    facture,
    parking_lot,
    parking_spot,
    reservation,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
