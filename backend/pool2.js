const mysql = require('mysql2/promise');

const pool2 = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'splitwise',
    connectionLimit: '100',
    database: 'splitwise'
});

pool2.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
    else {
        console.log("Connected!");
    }
  });
  
module.exports = pool2;