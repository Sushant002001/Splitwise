const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.get('/:user_id', (req, res) => {
  console.log('Inside displayinvite Post Request');
  
  let sql = `CALL display_group_invite('${req.params.user_id}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    if(result && result.length > 0){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(result[0][0]));
    }
    else{
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("NO NEW INVITE");
    }

  })
});

module.exports = router;