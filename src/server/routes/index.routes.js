const mysql = require('mysql');
const express = require('express');

const router = express.Router();
const config = require('../../config/config');
const article = require('./article.route');
const user = require('./user.route');

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
  });
  connectionPool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
      console.log('Connection Failed !');
    } else {
      res.send('Connection Successful !');
      console.log(connection);
    }
  });
});

router.use('/article', article);
router.use('/user', user);

// export default router;
module.exports = router;
