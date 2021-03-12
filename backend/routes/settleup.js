const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.post('/', (req, res) => {
  console.log('Inside settleup Post Request');
  console.log('Req Body : ', req.body);
  
  let sql = `INSERT INTO bill_transaction(bill_id, user_id, owed_user_id, amount) VALUES (-1, ${req.body.user_id}, ${req.body.owed_user_id}, ${req.body.amount} );`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    else{
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("YOU ARE ALL SETTLED UP");
    }
  })
});

module.exports = router;