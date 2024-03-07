- TO DO 

    - Créer un test d'intégration / fonctionnel qui va tester l'ensemble des trois fonctions : 
        -> sur la route qui créé un article : tester la route, le middleware et le controller + middleware gestion d'erCréation reur
        -> package supertest (pour faire des appels sur les endpoints)
        -> initialisation de l'API & base de données
            => BeforeAll
        -> À chaque test exécuté => rollback 
            => AfterEach
            => Drop les tables
            => Reset
        => deconnecter l'API / BDD 
            => AfterAll

    - Créer des scripts qui lancent indépendamment les test unitaires et fonctionnels
        - Fichier de configs jest qui va lancer tous les fichiers en .integration & .unit
        - Qui valancer tous les fichiers dans le dossier unit ou le dossier integration
        - Tag dans jest

    - TDD :
        Créer un test unitaire sans passer par l'écriture du controller 
        On souhaite connaître la moyenne du nombre de caractère dans les descriptions des articles 
        -> controller qui va passer à travers tous les articles 
        -> Compte les mots dans le champs description 
        -> en faire une moyenne global
        -> Doit renvoyer une moyenne 