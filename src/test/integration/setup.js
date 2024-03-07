const { launchServer, closeServer } = require('../../services/server.service');
const { launchDb, closeDb } = require('../../services/db.service');

beforeAll(async () => {
    await launchDb();
    await launchServer();
});

afterAll(async () => {
    await closeServer();
    await closeDb();
});