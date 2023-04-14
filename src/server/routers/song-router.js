const express = require('express');
const router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

router.post('/checkSong', (req, res) => { // 이미 저장한 노래가 있는지 확인
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명
    const artist = req.body.artist; // 가수명

    const chkDupSQL = "select count(*) from userssong where user_id = ? and name = ? and artist = ?;";

    db.query(chkDupSQL,[id, name, artist], (err, result) => {
        res.send(result)
    });
});

router.post('/addSong', (req, res) => { // 노래 저장하라고 왔을 때
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명s
    const artist = req.body.artist; // 가수명

    const sqlQuery = "insert into userssong(user_id, name, artist) values (?,?,?);"; // 
    db.query(sqlQuery, [id, name, artist], (err, result) => {
        res.send(result);
    });

});

router.post('/delSong', (req, res) => { // 노래 삭제하라고 왔을 때
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명
    const artist = req.body.artist; // 가수명

    const sqlQuery = "delete from userssong where user_id = ? and name = ? and artist = ?;"; 
    db.query(sqlQuery, [id, name, artist], (err, result) => {
        res.send(result);
    });

});

router.get('/getPopularChart', (req, res) => { // 인기차트 불러오기
    const sqlQuery = "select * from popularchart;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

router.post('/getTopSongList', (req, res) => { // 유저 성별, 연령대에 따른 Top3 노래 불러오기 
    const age = req.body.age;
    const gender = req.body.gender;
    const sqlQuery = `SELECT us.name, us.artist, COUNT(us.name) 
                    FROM userssong AS us JOIN user AS u ON us.user_id = u.id 
                    WHERE u.name IN (SELECT u2.name FROM music.user AS u2 WHERE FLOOR((YEAR(NOW())-YEAR(u2.birthday))/10)*10 = ? AND gender = ?)
                    GROUP BY us.name HAVING COUNT(us.name) >= 1 ORDER BY 3 DESC LIMIT 3;`;
    db.query(sqlQuery, [age, gender], (err, result) => {
        res.send(result);
    });
});

router.post('/songList', (req, res) => { //유저가 저장한 노래 목록 불러오기
    const id = req.body.id;
    const sqlQuery = "select * from userssong where user_id = ?;";
    db.query(sqlQuery,[id], (err, result) => {
        res.send(result);
    });
});



module.exports = router;