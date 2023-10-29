const express = require("express");
var router = express.Router();
const mysql = require("mysql"); // mysql 연동
const dbconfig = require("../config/db.js");
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

console.log(dbconfig);

router.post("/", function (req, res) {
    // 로그인 하라고 왔을 때
    console.log("/login", req.body);
    const id = req.body.id; // 아이디
    const pw = req.body.pw; // 비번

    //아이디랑 비번이 같은 데이터가 있는지 카운트 해본당
    const sqlQuery =
        "select count(*) as 'cnt', ROUND((TO_DAYS(NOW()) - (TO_DAYS(birthday))) / 365) AS age, id, name, gender  from user where id =? and pw =?;";
    db.query(sqlQuery, [id, pw], (err, result) => {
        res.send(result);
    });
});

module.exports = router;
