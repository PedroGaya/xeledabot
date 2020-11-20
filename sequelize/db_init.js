const Sequelize = require('sequelize')

var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

console.log("Starting syncing process...")

require('./models/Configs')(sequelize, Sequelize.DataTypes);
require('./models/Servers')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log("Database synced");
	sequelize.close();
}).catch(console.error);