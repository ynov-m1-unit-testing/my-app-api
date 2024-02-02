const isAuth = require("../middleware/isAuth");

describe("Middleware isAuth", () => {
    it('It should return a res 401 with a message', () => {
        // simuler la req avec la propriété headers.authorization vide
        // mocker json && status
        // status code : 401
        // return object {message: 'Unauthorized'}
    });
    it('It should call next', () => { 
        // recréer la req pour que la fonction next puisse passée
        // mocker la fonction next 
        // expect fonction next is called (toHaveBeenCalledTimes)
    }
});