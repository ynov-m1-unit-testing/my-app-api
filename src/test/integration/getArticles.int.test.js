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

beforeEach(async () => {
    // lancer le serveur (créer une fonctionn qui utilise .listen())
    // on se connect à la base de données
})

describe('GET/ articles', async() => {
    it("should return a list of articles", async () => { 
        const response = await request(app).get('/articles');
        //expect => response 200
        //body  => articles array
        // body => success true
    });
});

afterEach(async () => { 
    // fermer le serveur (créer une fonction qui utilise .close())
    // on se déconnecte de la base de données
});
