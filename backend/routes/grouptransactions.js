const express = require("express");
const router = express.Router();
const pool = require('../pool.js');


router.get('/:groupname', (req, res) => {
    console.log('Inside group Transactions get Request');
    
    let sql = `CALL get_group_balance('${req.params.groupname}');`;
    console.log(sql)
  
    pool.query(sql,(err, result) =>{
      if(err){
        res.writeHead(500, {
          'Content-Type': 'text/plain'
          });
          res.send(err);
      }
      console.log(result)
      if(result && result.length > 0){
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        console.log(result)
        res.end(JSON.stringify(result[0]));
      }
      else{
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("NO_Groups");
      }
  
    })
  });

  module.exports = router;