// // const express = require('express');
// // const { fstat } = require('fs');
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');

// // const router = express.Router();
// // const pool = require('../pool.js');

// // const imageStorage = multer.diskStorage({
// //   destination: `${path.join(__dirname, '..')}/images/users`,
// //   filename: (req, file, callback) => {
// //     callback(null, `user${req.body.user_id}-${Date.now()}${path.extname(file.originalname)}`);
// //   },
// // });

// // const upload = multer({
// //   storage: imageStorage,
// //   limits: { filesize: 1000000 },
// // }).single('avatar');

// // router.post('/', (req, res) => {
// //   upload(req, res, (err) => {
// //     if (!err) {
// //       // console.log('Inside upload POST request');
// //       const sql = `UPDATE users SET profile_image='${req.file.filename}' WHERE user_id=${req.body.user_id}`;
// //       pool.query(sql, (sqlerr, result) => {
// //         if (sqlerr) {
// //           res.writeHead(500, {
// //             'Content-Type': 'application/json',
// //           });
// //           res.end(JSON.stringify({ message: sqlerr }));
// //         }
// //       });
// //       res.writeHead(200, {
// //         'Content-Type': 'application/json',
// //       });
// //       res.end(JSON.stringify({ message: req.file.filename }));
// //     } else {
// //       res.writeHead(500, {
// //         'Content-Type': 'application/json',
// //       });
// //       res.end(JSON.stringify({ message: err }));
// //     }
// //   });
// // });

// router.get('/:profile_image', (req, res) => {
//   // console.log('Inside image GET request');
//   // console.log('Req Body : ', req.body);
//   const sql = `SELECT profile_image FROM users WHERE user_id=${req.body.user_id};`;
//   // console.log('SQL File : ', sql);
//   pool.query(sql, (err, result) => {
//     if (err) {
//       res.writeHead(500, {
//         'Content-Type': 'application/json',
//       });
//       res.end(JSON.stringify({ message: err }));
//     }
//     // console.log(result);
//     if (result && result.length > 0) {
//       const imageName = result[0].image;
//       const imagePath = `${path.join(__dirname, '..')}/images/users/${imageName}`;
//       // console.log(image);
//       if (fs.existsSync(imagePath)) {
//         res.sendFile(imagePath);
//       }
//     } else {
//       res.sendFile(`${path.join(__dirname, '..')}/images/users/userPlaceholder.png`);
//     }
//   });
// });

// module.exports = router;



// var express = require('express');
// var router = express.Router();
// var sql = require('../sql');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // multer options
// // const upload = multer({
// //     // type : Buffer,
// //     dest: 'images'
// //     })
// const userstorage = multer.diskStorage({
//     destination: path.join(__dirname, '..') + '\\images\\',
//     filename: (req, file, cb) => {
//         cb(null, 'user' + req.body.userId + "-" + Date.now() + path.extname(file.originalname));
//     }
// });
// const useruploads = multer({
//     storage: userstorage,
//     limits: { fileSize: 1000000 },
// }).single("image");

// router.get('/:userImage', (req, res) => {
//             var image = path.join(__dirname, '..') + '/images/' + req.params.userImage;
//             // console.log(image)
//             if (fs.existsSync(image)) {
//                 // res.set('Content-Type', 'image/jpg')
//                 res.sendFile(image)
//                 // res.sendFile(image);
//             }
//             else {
//                 res.sendFile(path.join(__dirname, '..') + '/images/userplaceholder.png')
//             }
// });