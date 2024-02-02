const isAuth = (req, res, next) => { 
    // si dans le header de ma requête, la propriété authorization n'existe pas || est vide || est null || est undefined || string vide
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
    }
    // si j'ai une valeur dans le header de ma requête, alors 
    next();
}

module.exports = isAuth;

- TO DO 

    - CRUD sur articles 
        - CreateArticle (/), method POST (req.body)
        - UpdateArticle (/); method PUT
        - deleteArticle (/), method DELETE

    - Tests unitaires sur ces 3 controllers 

    - Test unitaire sur le middleware isAuth

    - Créer un test d'intégration / fonctionnel qui va tester l'ensemble des trois fonctions : 
        -> sur la route qui créé un article : tester la route, le middleware et le controller + middleware gestion d'erreur
        -> package supertest (pour faire des appels sur les endpoints)