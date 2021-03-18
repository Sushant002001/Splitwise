const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.post('/', (req, res) => {
  console.log('Inside rejectInvite Post Request');
  console.log('Req Body : ', req.body);
  
  let sql = `CALL group_invite_reject('${req.body.user_id}', '${req.body.groupname}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
    }
    console.log(result[0][0].status)
    if(result && result.length > 0 && result[0][0].status=='INVITATION REJECTED'){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(result[0][0].status);
    }
    else if(result && result.length > 0 && result[0][0].status!= 'INVITATION REJECTED'){
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end(result[0][0].status);
    }

  })
});

module.exports = router;