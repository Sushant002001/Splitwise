const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const pool = require('../pool.js');

const imageStorage = multer.diskStorage({
  destination: `${path.join(__dirname, '..')}/public/images/users`,
  filename: (req, file, callback) => {
    callback(null, `user${req.params.user_id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const imageStoragegroups = multer.diskStorage({
    destination: `${path.join(__dirname, '..')}/public/images/groups`,
    filename: (req, file, callback) => {
      callback(null, `user${req.params.user_id}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });

const upload = multer({
  storage: imageStorage,
  limits: { filesize: 1000000 },
}).single('profile_image');

const uploadgroup = multer({
    storage: imageStoragegroups,
    limits: { filesize: 1000000 },
  }).single('group_image');

router.post('/:user_id', (req, res) => {
    upload(req, res, (err) => {
        if (!err) {
            console.log('Inside image upload POST request');
            const sql = `UPDATE users SET profile_image='${req.file.filename}' WHERE user_id=${req.params.user_id}`;
            pool.query(sql,(err, result)=> {
              if(err){
                //   res.writeHead(500, {
                //     'Content-Type': 'text/plain'
                //     });
                //     res.send(err);
                }else{
                  res.writeHead(200, {
                      'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify({ message: req.file.filename }));
                }
              });
          }
    })
})
  

router.post('/group/:group_name', (req, res) => {
  uploadgroup(req, res, (err) => {
    if (!err) {
      console.log('Inside group Upload POST request');
      const sql = `UPDATE groups SET group_image='${req.file.filename}' WHERE group_name='${req.params.group_name}';`;
      pool.query(sql, (err,result) => {
        if(err){
            console.log(err)
            // res.writeHead(500, {
            //   'Content-Type': 'text/plain'
            //   });
            //   res.send(err);
          }else{
            res.writeHead(200, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({ message: req.file.filename }));
          }
        });
    }
  });
});

router.get('/:userImage', (req, res) => {
  console.log('Inside user image GET request');
  // console.log('Req Body : ', req.body);
  const image = `${path.join(__dirname, '..')}/public/images/users/${req.params.userImage}`;

  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/images/users/userPlaceholder.png`);
  }
});

router.get('/group/:group_image', (req, res) => {
  console.log('Inside group image GET request');
  console.log('Req Body : ', req.body);
  const image = `${path.join(__dirname, '..')}/public/images/groups/${req.params.group_image}`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(`${path.join(__dirname, '..')}/public/images/groups/groupPlaceholder.png`);
  }
});

module.exports = router;