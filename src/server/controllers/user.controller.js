const bcrypt = require('bcrypt');
const userModule = require('../modules/user.module');

const userPost = (req, res) => {
//   const insertValues = req.body;
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10)
  };
  userModule.createUser(insertValues).then((result) => {
    res.send(JSON.stringify(result, null, 3));
  }).catch((err) => { return res.send(err); });
};

const userGet = (req, res) => {
  userModule.getUser().then((result) => {
    console.log(result);
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

const GetById = (req, res, next) => {
  const userId = req.params.user_id;
  userModule.getUserById(userId).then((result) => {
    res.send(result);
  }).catch((err) => { next(err); });
};

const userPut = (req, res) => {
  const userId = req.params.user_id;
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10)
  };
  userModule.modifyUser(insertValues, userId).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

const userDelete = (req, res) => {
  const userId = req.params.user_id;
  userModule.deleteUser(userId).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

const userLogin = (req, res, next) => {
  const insertValues = req.body;
  userModule.selectUserLogin(insertValues).then((result) => {
    res.send(result);
  }).catch((error) => { next(error); });
};


module.exports = {
  userPost,
  userGet,
  GetById,
  userPut,
  userDelete,
  userLogin
};
