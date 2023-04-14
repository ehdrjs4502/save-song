const express = require('express');
var router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

router.post('/userName', (req, res) => { // 회원가입 하라고 왔을 때
    const id = req.body.id;

    const sqlQuery = "select name from user where id = ?;";
    db.query(sqlQuery, [id], (err, result) => {
        res.send(result);
    });

})


module.exports = router;