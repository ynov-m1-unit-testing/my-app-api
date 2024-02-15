const isAuth = require("../../middleware/isAuth");

describe("Middleware isAuth", () => {
    it('It should return a res 401 with a message if my authorization is empty', () => {
        // mocker json && status
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const res = { status: mockStatus };

        // simuler la req avec la propriété headers.authorization vide
        const req = {
            headers: {
                authorization: ""
            }
        }

        const next = jest.fn();

        isAuth(req, res, next);

        // status code : 401
        expect(mockStatus).toHaveBeenCalledWith(401);
        // return object {message: 'Unauthorized'}
        expect(mockJson).toHaveBeenCalledWith({
            message: 'Unauthorized'
        })
    });
    it('It should call next', () => {
        // simuler la req avec la propriété headers.authorization vide
        const req = {
            headers: {
                authorization: "test"
            }
        }
        const res = {};
        const next = jest.fn();
        isAuth(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});