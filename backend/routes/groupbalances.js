const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.get('/:user_id/:groupname', (req, res) => {
  console.log('Inside groupbalances get Request');
  
  let sql = `CALL get_group_details('${req.params.user_id}', '${req.params.groupname}');`;
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
      res.end("NO NEW INVITE");
    }

  })
});

module.exports = router;