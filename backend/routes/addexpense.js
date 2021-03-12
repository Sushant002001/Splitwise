const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.post('/', (req, res) => {
  console.log('Inside addexpense Post Request');
  console.log(req.body)
  
  let sql = `CALL add_expense('${req.body.group_id}', '${req.body.billname}', '${req.body.userid}', '${req.body.amount}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      // res.writeHead(500, {
      //   'Content-Type': 'text/plain'
      //   });
      //   res.send(err);
      console.log(err)
    }
    console.log(result)
    if(result && result.length > 0 && result[0][0].status == "BILL_ADDED"){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify("BILL ADDED"));
    }
    else if(result && result.length > 0 && result[0][0].status != "BILL ADDED") {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("ERROR");
    }

  })
});

module.exports = router;