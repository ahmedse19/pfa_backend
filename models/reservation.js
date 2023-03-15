const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservation', {
    Id_reservation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Entry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Exit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Status_paiement: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'Id_client'
      }
    },
    Id_facture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facture',
        key: 'Id_facture'
      }
    },
    Id_spot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parking_spot',
        key: 'Id_spot'
      }
    },
    Id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'administrateur',
        key: 'Id_Admin'
      }
    }
  }, {
    sequelize,
    tableName: 'reservation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_reservation" },
        ]
      },
      {
        name: "FK_gerer",
        using: "BTREE",
        fields: [
          { name: "Id_admin" },
        ]
      },
      {
        name: "FK_client",
        using: "BTREE",
        fields: [
          { name: "Id_client" },
        ]
      },
      {
        name: "FK_spot",
        using: "BTREE",
        fields: [
          { name: "Id_spot" },
        ]
      },
      {
        name: "FK_facture",
        using: "BTREE",
        fields: [
          { name: "Id_facture" },
        ]
      },
    ]
  });
};
