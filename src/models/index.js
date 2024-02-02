'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

// on se connecte à la base de données avec la configuration de sequelize
sequelize = new Sequelize(config.database, config.username, config.password, config);

// on récupère tous les modèles de sequelize qui se trouvent dans le dossier courant
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// on parcourt tous les modèles pour vérifier s'il y a une méthode "associate"
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    // si la méthode existe, on l'appelle avec l'objet db en paramètre
    // cette méthode permettra de définir les associations entre les modèles
    db[modelName].associate(db);
  }
});

// on ajoute sequelize et Sequelize à l'objet db
// sequelize permettra d'utiliser les méthodes de sequelize
// Sequelize permettra d'utiliser les types de données de sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
