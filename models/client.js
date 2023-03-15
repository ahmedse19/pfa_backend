const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    Id_client: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    'Véhicule': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    N_immatriculation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Solde: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    'Méthode_paiment': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    licenseplate_dir: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    valide: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_client" },
        ]
      },
    ]
  });
};
