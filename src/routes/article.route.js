const express = require('express');
const router = express.Router();
const { getArticles, getArticle, searchArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/article.controller');
const isAuth = require('../middleware/isAuth');

router.get('/search', searchArticles);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id', isAuth, updateArticle);
router.delete('/:id', isAuth, deleteArticle);
router.post('/', isAuth, createArticle);

module.exports = router;