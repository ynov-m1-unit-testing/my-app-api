const { launchServer, closeServer } = require('../../services/server.service');
const { launchDb, closeDb, resetDb } = require('../../services/db.service');

beforeAll(async () => {
    await launchDb();
    await launchServer();
});

afterAll(async () => {
    await closeServer();
    await closeDb();
});

afterEach(async () => {
    // clear db
    await resetDb();
});