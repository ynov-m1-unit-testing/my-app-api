const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const Sequelize = require('sequelize');
const config = require('./config/config.js')[process.env.NODE_ENV || 'development'];
const router = require('./routes/index.js');
const db = require('./models/index.js');

// on utilise cors pour autoriser les requêtes provenant d'autres domaines
app.use(cors())
app.options(process.env.FRONTEND_URL, cors());
app.use(express.json());

// on se connecte à la base de données avec la configuration de sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    port: config.port,
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        connectTimeout: 60000
    }
});

// on synchronise sequelize avec la base de données
// La synchronisation permet de créer les tables dans la base de données si elles n'existent pas

// redisClient.connect().then(() => {
//     console.log("redis conencted")
// }).catch(err => console.log(err));

sequelize.sync()
    .then(() => {
        console.log('database synchronised');
    })
    .catch(err => {
        console.error('database synchronisation error :', err);
    });

    
// On définit une route initiale pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
    res.send("Welcome to my API");
})

// on définit la route pour récupérer tous les articles avec les controllers
app.use("/api", router);

// on lance le serveur sur le port défini dans le fichier .env
app.listen(process.env.PORT, () => {
    console.log(`server launch on port ${process.env.PORT}`);
});