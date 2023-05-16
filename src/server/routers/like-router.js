const express = require('express');
const router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

router.post('/like', (req, res) => {
    const title = req.body.songTitle; 
    const artist = req.body.songArtist; 
    const userID = req.body.userID;

    const sqlQuery = "insert into likes(user_id, title, artist) values (?,?,?);"; // 
    db.query(sqlQuery, [userID, title, artist], (err, result) => {
        res.send(result);
    });

});

router.post('/count', (req, res) => {
    const title = req.body.songTitle;
    const artist = req.body.songArtist; 
    console.log(req.body);
    // Likes 테이블에서 해당 노래의 좋아요 수 조회
    const query = 'select count(*) as count from likes where title = ? and artist = ?;';
    db.query(query, [title, artist], (err, result) => {
      res.send(result);
      console.log(result);
    });
});

module.exports = router;