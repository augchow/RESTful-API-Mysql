const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const APPError = require('../helper/AppError');

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

// Create User POST
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

// Get All User GET
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

// Update an User UPDATE/PUT
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

// Delete an User DELETE
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

function selectUserLogin(insertValues) {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        console.log(insertValues);
        connection.query('SELECT * FROM user WHERE user_mail = ?', [insertValues.user_mail], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (Object.keys(result).length === 0) {
            reject(new APPError.LoginError1());
          } else {
            const dbHashPassword = result[0].user_password;
            const userPassword = insertValues.user_password;

            bcrypt.compare(userPassword, dbHashPassword).then((res) => {
              if (res) {
                const payload = {
                  user_id: result[0].user_id,
                  user_name: result[0].user_name,
                  user_mail: result[0].user_mail
                };

                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, 'my_secret_key');
                resolve(Object.assign({ code: 200 }, { message: 'login successful', token }));
              } else {
                reject(new APPError.LoginError2());
              }
            });
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
  deleteUser,
  selectUserLogin
};
