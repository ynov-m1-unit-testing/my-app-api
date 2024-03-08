const { launchServer } = require('./services/server.service');
const { launchDb } = require('./services/db.service');
require('dotenv').config();
if (process.env.NODE_ENV !== 'test') {
    launchDb();
    launchServer();
}