const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facture', {
    Id_facture: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Montant_facture: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Methode_paiement: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Date_paiement: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Amende_retard: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Id_reservation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reservation',
        key: 'Id_reservation'
      }
    }
  }, {
    sequelize,
    tableName: 'facture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_facture" },
        ]
      },
      {
        name: "Id_reservation",
        using: "BTREE",
        fields: [
          { name: "Id_reservation" },
        ]
      },
    ]
  });
};
