const { getArticles } = require("../../controllers/article.controller");
const db = require("../../models");
const { ARTICLES } = require("../data/articles");

jest.mock('../../models/', () => (
    {
        Article: {
            findAll: jest.fn()
        },
    }
));

describe("Controller getArticles", () => {
    it("It should return a res 200 with a list of articles as an array of objects", async () => {
        //utiliser faker pour générer des données aléatoires
        const mockup = ARTICLES;
        // on simule la résolution de la promesse de la méthode findAll() en passant le jeu de données à tester
        db.Article.findAll.mockResolvedValue(mockup);
        // on simule les méthodes json() et status() de l'objet res
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = {};

        // on appelle la méthode getArticles
        await getArticles(req, res);

        // on vérifie que la méthode json() renvoie bien le mockup
        expect(mockJson).toHaveBeenCalledWith({
            results: ARTICLES, 
            success: true
        });

        // expect 200 status
        expect(mockStatus).toHaveBeenCalledWith(200);

    });
    it("It should return a res 404 not found with an empty array of articles", async () => {
        const mockup = [];
        db.Article.findAll.mockResolvedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = {};
        // on appelle la méthode getArticles
        await getArticles(req, res);

        // vérifier qu'on reçoit le code 404
        expect(mockStatus).toHaveBeenCalledWith(404);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "No articles found"
        });
    });
    it("It should return a res 500 error", async () => {
        const mockup = new Error("Internal server error");
        db.Article.findAll.mockRejectedValue(mockup);
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        // on simule l'objet res
        const res = { status: mockStatus };
        // on simule l'objet req
        const req = {};
        // on appelle la méthode getArticles
        await getArticles(req, res);

        // vérifier qu'on reçoit le code 500
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "Internal server error"
        });
    });
});