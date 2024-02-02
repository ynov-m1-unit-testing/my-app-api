const express = require('express');
const router = express.Router();
const { getArticles, getArticle, searchArticles } = require('../controllers/article.controller');
const isAuth = require('../middleware/isAuth');

router.get('/search', searchArticles);
router.get('/:id', getArticle);
router.get('/', getArticles);
// router.post('/', isAuth, createArticle);

module.exports = router;