//https://www.npmjs.com/package/supertest
// faire un test sur la route initiale

// Créer trois fichier de config jest : 
// - jest.config.js
// - jest.config.unit.js
// - jest.config.integration.js

// Créer 3 scripts dans le package.json :
// - test = jest --config jest.config.js
// - test:unit =    jest --config jest.config.unit.js
// - test:integration = jest --config jest.config.integration.js

// Dans les fichiers de config, ajouter l'option suivante : 
// testRegex: doc : https://jestjs.io/docs/configuration#testregex-string--arraystring
// -> L'idée ici est d'écrire l'expression régulière qui va matcher les fichiers de test unitaire et d'intégration

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