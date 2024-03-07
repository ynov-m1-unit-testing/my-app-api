const express = require('express');
const cors = require('cors');
const router = require('../routes/index.js');

const app = express();

// on utilise cors pour autoriser les requêtes provenant d'autres domaines
app.use(cors())
app.options(process.env.FRONTEND_URL, cors());
app.use(express.json());

// On définit une route initiale pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
    res.send("Welcome to my API");
})

// on définit la route pour récupérer tous les articles avec les controllers
app.use("/api", router);

module.exports = app;