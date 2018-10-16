'use strict';

const fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  basename = path.basename(__filename),
  env = process.env.NODE_ENV || 'development',
  config = require(__dirname + '/../config/config.json')[env],
  db = {};


// if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
//   // the application is executed on Heroku ... use the postgres database
//   var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

//   sequelize = new Sequelize(match[5], match[1], match[2], {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     port: match[4],
//     host: match[3],
//     logging: true //false
//   })
// }

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  <% if (databaseType == 'sqlite'){%>
  sequelize = new Sequelize('<%= databaseName %>', '<%= userName %>', null, {
    dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
    storage: path.join(__dirname, "<%= databaseName %>"),
  })
  <% } else { %>
  sequelize = new Sequelize('<%= databaseName %>', '<%= userName %>', '<%= password %>', {
    dialect: '<%= databaseType %>'
    host: '<%= hostName %>'
    port: '<%= port %>'
  })
  <% } %>
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
