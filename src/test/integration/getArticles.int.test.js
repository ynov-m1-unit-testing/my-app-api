const request = require('supertest');

const app = require('../../services/app.service');

describe('GET / get all articles', () => { 

    it("should return a res 200 with an array of articles ", async () => {
        const res = await request(app).get('/api/articles');
        expect(res.status).toBe(200);
        expect(res.body.results).toBeInstanceOf(Array);
        expect(res.body.success).toBe(true);
    });

});