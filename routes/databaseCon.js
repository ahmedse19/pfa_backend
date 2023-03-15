const { Sequelize } = require("sequelize");
var initModels = require("../models/init-models");
// get the sequelize models once and reuse them for all requests to the database
let models;

module.exports = {
  getModels: function () {
    if (!models) {
      const sequelize = new Sequelize("test", "root", "", {
        host: "localhost",
        dialect: "mysql",
      });

      models = initModels(sequelize);
    }
    return models;
  },
};
