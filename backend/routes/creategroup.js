const express = require("express");
const router = express.Router();
const pool = require('../pool.js');


router.post('/', (req, res) => {
  console.log('Inside Creategroup Post Request');
  console.log('Req Body : ', req.body);
  
  console.log(req.session.user);
  let sql = `CALL create_group('${req.session.user}', '${req.body.groupname}');`;

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
      res.end("NEW GROUP CREATED");
    }
    else if(result && result.length > 0 && result[0][0].status==0){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("DUPLICATE GROUP NAME");
    }

  })
});

module.exports = router;