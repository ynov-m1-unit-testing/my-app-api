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
    })
});

// TEST REJECT VALUE 
// TEST SI BODY EST VIDE
// TEST SI IL MANQUE UNE PROPRIÉTÉ DANS LE BODY