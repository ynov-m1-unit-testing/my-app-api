const { getArticle } = require("../../controllers/article.controller");
const db = require("../../models");
const {ARTICLE } = require("../data/articles");

jest.mock('../../models/', () => (
    {
        Article: {
            findByPk: jest.fn()
        },
    }
));

describe("Controller getArticle", () => {
    it('It should return a res 200 with an article as an object', async () => {
        const mockup = ARTICLE;
        db.Article.findByPk.mockResolvedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = { params: { id: 1}};

        await getArticle(req, res);

        expect(mockStatus).toHaveBeenCalledWith(200);

        expect(mockJson).toHaveBeenCalledWith({
            results: ARTICLE,
            success: true
        });
    });

    if ('it should return 404 if no article found', async () => {
        const mockup = null;
        db.Article.findByPk.mockResolvedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = { params: { id: 3 } };

        await getArticle(req, res);

        expect(mockStatus).toHaveBeenCalledWith(404);

        expect(mockJson).toHaveBeenCalledWith({
            results: "Article not found",
            success: false
        });
    });

    it("it should return a 400 error if the id is undefined", async () => {
        const mockup = null;
        db.Article.findByPk.mockResolvedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = { params: { id: "hjkl" } };

        await getArticle(req, res);

        expect(mockStatus).toHaveBeenCalledWith(400);

        expect(mockJson).toHaveBeenCalledWith({
            message: "Bad request. No id provided",
            success: false
        });
    })
    // tester le cas où on trouve un article
    // tester si Id not found
    // tester si pas d'ID
    // etc... (500 etc..)
});