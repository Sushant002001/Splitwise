const express = require("express");
const router = express.Router();
const pool = require('../pool.js');


router.post('/', (req, res) => {
  console.log('Inside Signup Post Request');
  console.log('Req Body : ', req.body);

  let sql = `CALL post_signup('${req.body.email_id}','${req.body.password}','${req.body.username}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    if(result && result.length > 0 && result[0][0].status==1){
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end("NEW_USER_CREATED");
      }
    else if(result && result.length > 0 && result[0][0].status==0){
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("USER_ALREADY_EXISTS");
      }
  })
});

module.exports = router;