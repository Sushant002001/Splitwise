const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.post('/', (req, res) => {
  console.log('Inside InviteGroup Post Request');
  console.log('Req Body : ', req.body);
  
  let sql = `CALL invite_to_group('${req.body.email_id}', '${req.body.groupname}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    console.log(result[0][0].status)
    if(result && result.length > 0 && result[0][0].status=='INVITATION SENT TO THE USER'){
        console.log("pass")
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      console.log(result[0][0].status);
      res.end(result[0][0].status);
    }
    else if(result && result.length > 0 && result[0][0].status!= 'INVITATION SENT TO THE USER'){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      console.log("fail")
      console.log(result[0][0].status);
      res.end(result[0][0].status);
    }

  })
});

module.exports = router;