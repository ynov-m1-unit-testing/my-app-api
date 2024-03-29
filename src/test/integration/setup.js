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

// beforeEach(async () => { 
//     // clear db
//     // await clearDb()
//     // resetDb
//     // await resetDb()
//     await resetDb();
// });