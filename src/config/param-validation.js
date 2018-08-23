const joi = require('joi');

module.exports = {
  createArticle: {
    body: {
      user_id: joi.number().required(),

      article_title: joi.string().required(),

      article_tag: joi.string().required(),

      article_content: joi.string().min(20).required()
    }
  },

  createUser: {
    body: {
      user_name: joi.string().required(),

      user_mail: joi.string().email().trim().required(),

      user_password: joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
    }
  }
};
