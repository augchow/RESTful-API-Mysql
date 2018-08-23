const express = require('express');

const router = express.Router();
const validate = require('express-validation');
const articleCtrl = require('../controllers/article.controller');
const paramValidation = require('../../config/param-validation');

router.route('/')
  .get(articleCtrl.articleGet)
  .post(validate(paramValidation.createArticle), articleCtrl.articlePost);

router.route('/:article_id')
  .put(articleCtrl.articlePut)
  .delete(articleCtrl.articleDelete);

module.exports = router;
