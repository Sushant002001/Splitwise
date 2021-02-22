const express = require("express");
const router = express.Router();
const pool = require('../pool.js');
const passwordHash = require('password-hash');

router.post('/', (req, res) => {
  console.log("Inside Login Post Request")
  console.log("Req Body : ", req.body);

  let sql = `CALL get_login('${req.body.email_id}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    if(result && result.length > 0 && result[0][0].status==1){
      console.log(result[0][0].password)
      if(result[0][0].password == req.body.password){
        res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
        req.session.user = req.body.email_id;
        let userObject = {
          user_id: result[0][0].user_id,
          email: result[0][0].email_id,
          password: result[0][0].password,
          name: result[0][0].user_name,
          phone: result[0][0].phone,
          currency: result[0][0].currency,
          language: result[0][0].language,
          timezone: result[0][0].timezone
        }
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(userObject));
      }
      else{
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("Incorrect Password");
      }
    }
    else{
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("User Does not Exists");
    }
  })
});

module.exports = router;