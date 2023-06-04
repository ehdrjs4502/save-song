const express = require('express');
var router = express.Router();
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('../config/db.js');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

router.post('/', (req, res) => { // 회원가입 하라고 왔을 때
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const gender = req.body.gender;
    const birthday = req.body.birthday;

    console.log(id, pw, name, gender, birthday)

    const sqlQuery = "insert into user values (?,?,?,?,?);";
    db.query(sqlQuery, [id, pw, name, gender, birthday], (err, result) => {
        res.send(result);
    });

})

router.post('/checkID', function (req, res) {  // 아이디 체크 하라고 왔을 때
    const user_id = req.body.id;     //req는 데이터를 받은건데 ①에서 data객체를 보내줫었다
  
    console.log(req.body.id);
    const sql = 'select id from user where id=?' //sql 쿼리문-> id 에맞는 row 들고온다
    db.query(sql, [user_id], function (err, rows, fields) {
        let checkid = new Object();
        checkid.tf =false;              // 이 아이디를 사용가능 한가요??
  
        if (rows[0] === undefined) { //중복되는게 없으면 (없으니까 못가져왓겠지)
            checkid.tf = true;  //없음 사용가능
            res.send(checkid);  //다시 클라이언트로 보낸다 checkid 객체를
        }
  
        else {
            checkid.tf = false; // 중복됨 사용x
            res.send(checkid);  
        }
    })
  });

module.exports = router;