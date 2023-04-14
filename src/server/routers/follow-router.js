const express = require('express');
const router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동


router.post('/isFollow', (req, res) => { // 팔로우 하라고 왔을 때
    const fromUser = req.body.fromUser; // 팔로우 거는 사람
    const toUser = req.body.toUser; // 팔로우 받는 사람

    const sqlQuery = "select * from follow where from_user = ? and to_user = ?;"; // 
    db.query(sqlQuery, [fromUser, toUser], (err, result) => {
        res.send(result);
    });

});

router.post('/unFollow', (req, res) => {
    const fromUser = req.body.fromUser; // 팔로우 거는 사람
    const toUser = req.body.toUser; // 팔로우 받는 사람

    const sqlQuery = "delete from follow where from_user = ? and to_user = ?"; 
    db.query(sqlQuery, [fromUser, toUser], (err, result) => {
        res.send(result);
    });
})

router.post('/follow', (req, res) => { // 팔로우 하라고 왔을 때
    const fromUser = req.body.fromUser; // 팔로우 거는 사람
    const toUser = req.body.toUser; // 팔로우 받는 사람

    const sqlQuery = "insert into follow(from_user, to_user) values (?,?);"; // 
    db.query(sqlQuery, [fromUser, toUser], (err, result) => {
        res.send(result);
    });

});

router.post('/followList', (req, res) => { // 팔로우 리스트 불러오기
    const id = req.body.id;
    const sqlQuery = "select to_user, (select name from user where id = to_user) as name from follow where from_user = ?;";
    db.query(sqlQuery,[id], (err, result) => {
        res.send(result);
    });
});

router.post('/followerList', (req, res) => { // 팔로워 리스트 불러오기
    const id = req.body.id;
    const sqlQuery = "select from_user, (select name from user where id = from_user) as name from follow where to_user = ?;";
    db.query(sqlQuery,[id], (err, result) => {
        res.send(result);
    });
});


module.exports = router;