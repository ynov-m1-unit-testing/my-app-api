
const app = require('./app.service');
require('dotenv').config();
let server;

const launchServer = async () => { 
    server = app.listen(process.env.PORT, () => {
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