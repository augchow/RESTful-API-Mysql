const mysql = require('mysql');
const config = require('../../config/config');

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

// User POST
function createUser(insertValues) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('INSERT INTO `user` SET ?', insertValues, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`Succesfully added user_id: ${result.insertId}`);
          }
          connection.release();
        });
      }
    });
  });
}

// Select statement
function getUser() {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('SELECT * FROM `user`', (error, result) => {
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
function modifyUser(insertValues, userId) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('UPDATE `user` SET ? WHERE user_id = ?', [insertValues, userId], (error, result) => {
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

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('DELETE FROM `user` WHERE user_id = ?', userId, (error, result) => {
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
  createUser,
  getUser,
  modifyUser,
  deleteUser
};
