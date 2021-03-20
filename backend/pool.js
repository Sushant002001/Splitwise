const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'database-1.cfws2wsto5kt.us-west-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'splitwise',
    database: 'splitwise'
});

pool.getConnection((err) => {
    if(err){
      throw 'Error occured: ' + err;
    }
    else {
        console.log("Connected!");
    }
  });
  
module.exports = pool;