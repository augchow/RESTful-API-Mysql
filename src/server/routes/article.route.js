const express = require('express');

const router = express.Router();
const validate = require('express-validation');
const articleCtrl = require('../controllers/article.controller');
const paramValidation = require('../../config/param-validation');

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization.split(' ');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader;

    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    res.status(403).send(Object.assign({ code: 403 }, { message: 'u are not logged in' }));
  }
};

router.route('/')
  .get(articleCtrl.articleGet)
  .post(validate(paramValidation.createArticle), articleCtrl.articlePost);

router.route('/:article_id')
  .put(articleCtrl.articlePut)
  .delete(articleCtrl.articleDelete);

router.get('/personal', ensureToken, articleCtrl.articlePersonalGet);

module.exports = router;
