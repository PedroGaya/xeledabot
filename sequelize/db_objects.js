const Sequelize = require('sequelize')

var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

const Config = require('./models/Configs')(sequelize, Sequelize.DataTypes);
const Server = require('./models/Servers')(sequelize, Sequelize.DataTypes);
const User = require('./models/Users')(sequelize, Sequelize.DataTypes);

console.log("Setting up associations...")

Server.hasOne(Config)
Server.belongsToMany(User, { through: "UserServers" })
User.belongsToMany(Server, { through: "UserServers" })

console.log("Done setting up associations.")

module.exports = { Config, Server, User }