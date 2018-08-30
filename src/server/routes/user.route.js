const express = require('express');

const router = express.Router();
const validate = require('express-validation');
const userCtrl = require('../controllers/user.controller');
const paramValidation = require('../../config/param-validation');

router.route('/')
  .get(userCtrl.userGet)
  .post(validate(paramValidation.createUser), userCtrl.userPost);

router.route('/:user_id')
  .put(userCtrl.userPut)
  .delete(userCtrl.userDelete);

router.route('/login')
  .post(userCtrl.userLogin);

module.exports = router;
