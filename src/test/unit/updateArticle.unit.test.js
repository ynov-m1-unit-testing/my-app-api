const { updateArticle } = require("../../controllers/article.controller");
const db = require("../../models");
const { ARTICLE } = require("../data/articles");

jest.mock('../../models/', () => (
    {
        Article: {
            update: jest.fn()
        },
    }
));

describe("PUT/ update Article controller", () => {
    // 200 - bonne execution du controller
    it("should return a res 200 with an article as an object", async () => {
        db.Article.update.mockResolvedValue(ARTICLE);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = {
            params: {
                id: 1
            },
            body: {
                title: ARTICLE.title,
                description: ARTICLE.description,
                date: ARTICLE.date
            }
        }

        await updateArticle(req, res);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({
            success: true,
            results: ARTICLE
        });

    });

    it("It should return a res 400 if the id is not a number", async () => {
        db.Article.update.mockResolvedValue(ARTICLE);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = {
            params: {
                id:"fghjkl",
            },
            body: ARTICLE
        }
        await updateArticle(req, res);
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockJson).toHaveBeenCalledWith({
            success: false, 
            message: "Id must be a number"
        });
    });

    it("should return a res with 404 if an article to update is not found ", async () => {
        db.Article.update.mockResolvedValue([0]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };
        const req = {
            params: {
                id: 2,
            },
            body: ARTICLE
        }
        await updateArticle(req, res);
        expect(mockStatus).toHaveBeenCalledWith(404);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "Article not found"
        });
    });
});