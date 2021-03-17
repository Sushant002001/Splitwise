const express = require("express");
const router = express.Router();
const pool = require('../pool.js');



router.get('/:user_id', (req, res) => {
  console.log('Inside mygroups get Request');
  console.log(req.params)
  
  let sql = `CALL get_groups('${req.params.user_id}');`;

  pool.query(sql,(err, result) =>{
    if(err){
      res.writeHead(500, {
        'Content-Type': 'text/plain'
        });
        res.send(err);
      console.log(err)
    }
    console.log(result)
    if(result && result.length > 0 && result[1][0].status == 1){
        let groupObject =result[0]
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(groupObject));
    }
    else{
      console.log("w")
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("ERROR");
    }

  })
});

router.put('/', (req, res) => {
    console.log('Inside profile put Request');
    console.log(req.body)
    
    let sql = `CALL update_profile('${req.body.user_id}', '${req.body.username}', '${req.body.email_id}', '${req.body.phone}', '${req.body.currency}', '${req.body.language}', '${req.body.timezone}');`;
  
    pool.query(sql,(err, result) =>{
      if(err){
        res.writeHead(500, {
          'Content-Type': 'text/plain'
          });
          res.send(err);
        console.log(err)
      }
      console.log(result)
      if(result && result.length > 0 && result[0][0].status == 1){
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          })
          res.end("Changes_updated");
      }
      else if(result && result.length > 0 && result[1][0].status == 0){
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("ERROR");
      }
  
    })
  });

module.exports = router;