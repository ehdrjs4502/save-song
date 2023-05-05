const express = require('express');
const router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

router.post('/searchUser', (req, res) => { // 유저 검색 하기
    const id = req.body.id;
    const sqlQuery = "select id, name from user where id LIKE ? or name LIKE ?";
    db.query(sqlQuery,[id + "%", id + "%"], (err, result) => {
        res.send(result);
    });
});

module.exports = router;