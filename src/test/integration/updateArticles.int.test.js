const request = require("supertest");
const app = require("../../services/app.service");

describe("PUT / update articles", () => {
    it("shoudl return a 401 status code if the user is not authenticated", async () => {
        const response = await request(app).put("/api/articles/10").send({ title: "new title" });
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({ message: "Unauthorized" });
    });
    it("should return a 200 status code if the user is authenticated", async () => { 
        const response = await request(app).put("/api/articles/6").set("Authorization", true).send({ title: "new title" });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.results).toBeInstanceOf(Array);
    });
})