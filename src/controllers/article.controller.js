const db = require('../models');
const { Op } = require("sequelize");

module.exports = {

    // controller pour récupérer tous les articles
    getArticles: async (req, res) => {

        try {
            // on récupère tous les articles avec la méthode de sequelize findAll()
            const articles = await db.Article.findAll();
            if (articles.length === 0) { 
                return res.status(404).json({
                    success: false,
                    message: "No articles found"
                });
            }
            // on renvoie les articles en json
            return res.status(200).json({
                results: articles,
                success: true
            });
        }

        catch (err) {
            // si une erreur se produit, on renvoie un code 500 avec le message de l'erreur
            res.status(500).json({
                success: false,
                message: err.message
            });
        }

    },

    searchArticles: async (req, res) => {
        try {
            const articles = await db.Article.findAll({
                where: {
                    title: {
                        [Op.like] : `%${req.query.string}%`
                    }
                }
            });
            if (articles.length === 0) { 
                return res.status(404).json({
                    success: false,
                    message: "No articles found"
                });
            }
            return res.status(200).json({
                results: articles,
                success: true
            });
        }

        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    // controller pour récupérer un article
    getArticle: async (req, res) => { 
            
            try {
                
                if (isNaN(req.params.id)) {
                    return res.status(400).json({
                        success: false,
                        message: "Bad request. No id provided"
                    });
                }
                // on récupère l'article avec la méthode de sequelize findByPk()
                const article = await db.Article.findByPk(req.params.id);
                
                if (!article) {
                    return res.status(404).json({
                        success: false,
                        message: "Article not found"
                    });
                }
                // on renvoie l'article en json
                return res.status(200).json({
                    results: article,
                    success: true
                });
            }
    
            catch (err) {
                // si une erreur se produit, on renvoie un code 500 avec le message de l'erreur
                res.status(500).json({ message: err.message });
            }
    },

    createArticle: async (req, res) => { 
        try {
            const { title, description, date } = req.body;
            console.log(Object.keys(req.body), "keys object");
            if (Object.keys(req.body).length == 0) {
                return res.status(400).json({
                    success: false,
                    message: "body is empty"
                })
            }
            if (!title || !description || !date) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                })
            }
            const newArticle = await db.Article.create(req.body);
            return res.status(201).json({
                results: newArticle,
                success: true
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    updateArticle: async (req, res) => { 
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Id must be a number"
                })
            }
            const updatedArticle = await db.Article.update(req.body, {
                where: {
                    id: id
                }
            });
            if (updatedArticle == 0) {
                return res.status(404).json({
                    success: false, 
                    message: "Article not found"
                })
            }
            return res.status(200).json({
                results: updatedArticle,
                success: true
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    deleteArticle: async (req, res) => { 
        try {
            const deletedArticle = await db.Article.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).json({
                results: deletedArticle,
                success: true
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

}