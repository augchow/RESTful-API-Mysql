const mysql = require('mysql');
const config = require('../../config/config');


const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

// insert statement
function createArticle(insertValues) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('INSERT INTO `article` SET ?', insertValues, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`Succesfully added article_id: ${result.insertId}`);
          }
          connection.release();
        });
      }
    });
  });
}

// Select statement
function getArticle() {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('SELECT * FROM `article`', (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
}

// Update
function modifyArticle(insertValues, userId) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('UPDATE `article` SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            resolve('No changes !');
          } else {
            resolve('Success');
          }
          connection.release();
        });
      }
    });
  });
}


function deleteArticle(userId) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('DELETE FROM `article` WHERE article_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('Delete Succesful !');
          } else {
            resolve('Delete Fail');
          }
          connection.release();
        });
      }
    });
  });
}

module.exports = {
  createArticle,
  getArticle,
  modifyArticle,
  deleteArticle
};
