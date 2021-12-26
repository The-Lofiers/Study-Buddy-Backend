'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// HAS ONE = ONE TO ONE
// BELONGS TO = ONE TO ONE
// HAS MANY = ONE TO MANY
// BELONGS TO MANY = MANY TO MANY

let sequelize; // = new Sequelize(config.database, config.username, config.password, config);
if (config.use_env_variable) { // if we are using the environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // connect to the database
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); // connect to the database
}

fs
  .readdirSync(__dirname) // read the directory
  .filter(file => { // filter the files
    // if the file is not a hidden file, and not the current file, and is a .js file
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // for each file
    // require the file and pass the sequelize and datatypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // add the model to the db object
  });

Object.keys(db).forEach(modelName => { // for each model
  if (db[modelName].associate) { // if the model has an associate function
    db[modelName].associate(db); // call the associate function
  }
});

db.sequelize = sequelize; // add the sequelize object to the db object
db.Sequelize = Sequelize; // add the Sequelize object to the db object

module.exports = db; // export the db object
