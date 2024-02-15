const { createArticle } = require("../controllers/article.controller");
const db = require("../models/");
const { ARTICLE }= require("./data/articles");

jest.mock('../models/', () => (
    {
        Article: {
            create: jest.fn()
        },
    }
));

describe("Controller createArticle", () => {
    it('It should return a res 201 with an article as an object', async () => {

        db.Article.create.mockResolvedValue(ARTICLE);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = {
            body: {
                title: ARTICLE.title,
                description: ARTICLE.description,
                date: ARTICLE.date
            }
        };

        await createArticle(req, res);

        expect(mockStatus).toHaveBeenCalledWith(201);

        expect(mockJson).toHaveBeenCalledWith({
            results: ARTICLE,
            success: true
        });
    });
    it('should return a res with a code 400 if a property is missing from the body ', async () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // mock req
        const req = {
            body: {
                title: ARTICLE.title,
                description: ARTICLE.description
            }
        }
        await createArticle(req, res);
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "All fields are required"
        });
    });
    it("It should return a res with code 400 if req.body is empt", async () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // mock req
        const req = {
            body: {}
        }
        await createArticle(req, res);
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "body is empty"
        });
    });
    it("shoudl return a res with code 500 if error server", async () => {
        const mockup = new Error("Internal server error");
        db.Article.create.mockRejectedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = {
            body: {
                title: ARTICLE.title,
                description: ARTICLE.description,
                date: ARTICLE.date
            }
        }
        // on appelle la méthode getArticles
        await createArticle(req, res);
        // vérifier qu'on reçoit le code 500
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "Internal server error"
        });
    });
});

// TEST REJECT VALUE 