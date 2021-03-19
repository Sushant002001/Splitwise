const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.post('/', (req, res) => {
  console.log('Inside Leave Group Post Request');
  console.log(req.body)
  
  let sql = `CALL group_member_leave('${req.body.user_id}', '${req.body.groupname}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
      console.log(err)
    }
    if(result && result.length > 0 && result[0][0].flag != "NOT_SETTLED"){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(result[0][0].flag);
    }
    else if(result && result.length > 0 && result[0][0].flag == "NOT_SETTLED") {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end(result[0][0].flag);
    }

  })
});

module.exports = router;