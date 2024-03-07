
const express = require('express');
const app = express();
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

let server;

const launchServer = async () => { 
    server = app.listen(config.port, () => {
        console.log(`server launch on port ${process.env.PORT}`);
    });
}

const closeServer = async () => {
    if (server) {
        server.close();
        console.log("server close")
    }
}

module.exports = {launchServer, closeServer}