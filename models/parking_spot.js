const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parking_spot', {
    Id_spot: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Num_spot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Max_Size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Montant_spot: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Availabilty: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Id_parking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parking_lot',
        key: 'Id_parking'
      }
    }
  }, {
    sequelize,
    tableName: 'parking_spot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_spot" },
        ]
      },
      {
        name: "FK_parking",
        using: "BTREE",
        fields: [
          { name: "Id_parking" },
        ]
      },
    ]
  });
};
