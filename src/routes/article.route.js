const express = require('express');
const router = express.Router();
const { getArticles, getArticle, searchArticles } = require('../controllers/article.controller');

router.get('/search', searchArticles);
router.get('/:id', getArticle);
router.get('/', getArticles);

module.exports = router;