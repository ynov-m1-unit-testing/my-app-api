const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const db = require('../models');

// on se connecte à la base de données avec la configuration de sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    port: config.port,
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        connectTimeout: 60000
    }
});

const launchDb = async () => {

    console.log(process.env.NODE_ENV);

    try {
        await sequelize.sync();
        console.log("Connection to the database has been established successfully");
    }
    catch (err) {
        console.error("Unable to connect to the database:", err);
    }
}

const closeDb = async () => { 
    try {
        await sequelize.close();
        console.log("Connection to the database has been closed successfully");
    }
    catch (err) {
        console.error("Unable to close the database:", err);
    }
}

const resetDb = async () => { 
    try {
        const jsonData = require('../test/data/articles.json');
        console.log(jsonData);
        await db.Article.destroy({
            truncate: true,
        });
        await db.Article.bulkCreate(jsonData.Article);
        console.log("Database has been reset successfully");
    }
    catch (err) {
        console.error("Unable to reset the database:", err);
    }
}

module.exports= {launchDb, closeDb, resetDb}