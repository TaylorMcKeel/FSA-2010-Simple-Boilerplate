const Sequelize = require("sequelize");

//taken from Nick
let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
} else {
  config = {
    logging: false,
  }
}


if(process.env.LOGGING){
  // console.log('in this if statement ---------------------------')
  delete config.logging
}


const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/nextaurant", config
);

module.exports = db;