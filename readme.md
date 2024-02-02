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