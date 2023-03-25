const express    = require('express'); // express 라이브러리 연동
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('./config/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()) //cors 오류 해결

app.set('port', process.env.PORT || 3001); // port : 3001로 서버 구동

app.get('/',(req, res) => {
    res.send("ㅎㅇ")
})

app.post('/signUp', (req, res) => { // 회원가입 하라고 왔을 때
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const gender = req.body.gender;
    const birthday = req.body.birthday;

    const sqlQuery = "insert into user values (?,?,?,?,?);";
    db.query(sqlQuery, [id, pw, name, gender, birthday], (err, result) => {
        res.send(result);
    });

})

app.post('/checkId', function (req, res) {  // 아이디 체크 하라고 왔을 때
    const user_id = req.body.id;     //req는 데이터를 받은건데 ①에서 data객체를 보내줫었다
  
    console.log(req.body.id);
    const sql = 'select id from user where id=?' //sql 쿼리문-> id 에맞는 row 들고온다
    db.query(sql, [user_id], function (err, rows, fields) {
        console.log("중복 체크할 id : ",rows);
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


app.post('/login', function (req, res) { // 로그인 하라고 왔을 때
    console.log("/login", req.body);
    const id = req.body.id; // 아이디
    const pw = req.body.pw; // 비번

    //아이디랑 비번이 같은 데이터가 있는지 카운트 해본당
  const sqlQuery = "select count(*) as 'cnt', ROUND((TO_DAYS(NOW()) - (TO_DAYS(birthday))) / 365) AS age  from user where id =? and pw =?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);
    // console.log(result[0]);
    // if (result[0].cnt === 1) {
    //   res.send({ message: "success" });
    // } else {
    //   res.send({ message: "fail" });
    // }
  });
})

app.post('/addSong', (req, res) => { // 노래 저장하라고 왔을 때
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명
    const artist = req.body.artist; // 가수명

    const sqlQuery = "insert into userssong(user_id, name, artist) values (?,?,?);"; // 
    db.query(sqlQuery, [id, name, artist], (err, result) => {
        res.send(result);
    });

})

app.get('/getPopularChart', (req, res) => {
    const sqlQuery = "select * from popularchart;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
    })
})


app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });