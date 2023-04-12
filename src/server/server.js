const express    = require('express'); // express 라이브러리 연동
const mysql      = require('mysql'); // mysql 연동
const dbconfig   = require('./config/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = mysql.createConnection(dbconfig); // mysql 내 db 연동

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()) //cors 오류 해결, 모든 도메인에서 제한 없이 해당 서버에 요청을 보내고 응답을 받을 수 있다.

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

    console.log(id, pw, name, gender, birthday)

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
  const sqlQuery = "select count(*) as 'cnt', ROUND((TO_DAYS(NOW()) - (TO_DAYS(birthday))) / 365) AS age, id, name, gender  from user where id =? and pw =?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);

  });
});

app.post('/checkSong', (req, res) => {
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명s
    const artist = req.body.artist; // 가수명

    const chkDupSQL = "select count(*) from userssong where user_id = ? and name = ? and artist = ?;";

    db.query(chkDupSQL,[id, name, artist], (err, result) => {
        res.send(result)
    });
});

app.post('/addSong', (req, res) => { // 노래 저장하라고 왔을 때
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명s
    const artist = req.body.artist; // 가수명

    const sqlQuery = "insert into userssong(user_id, name, artist) values (?,?,?);"; // 
    db.query(sqlQuery, [id, name, artist], (err, result) => {
        res.send(result);
    });

});

app.post('/delSong', (req, res) => { // 노래 저장하라고 왔을 때
    const id = req.body.id; // 아이디
    const name = req.body.name; // 노래명
    const artist = req.body.artist; // 가수명

    const sqlQuery = "delete from userssong where user_id = ? and name = ? and artist = ?;"; 
    db.query(sqlQuery, [id, name, artist], (err, result) => {
        res.send(result);
    });

});

app.post('/follow', (req, res) => { // 노래 저장하라고 왔을 때
    const fromUser = req.body.fromUser; // 팔로우 거는 사람
    const toUser = req.body.toUser; // 팔로우 받는 사람

    const sqlQuery = "insert into follow(from_user, to_user) values (?,?);"; // 
    db.query(sqlQuery, [fromUser, toUser], (err, result) => {
        res.send(result);
    });

});


app.get('/getPopularChart', (req, res) => {
    const sqlQuery = "select * from popularchart;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.post('/getTopSongList', (req, res) => {
    const age = req.body.age;
    const gender = req.body.gender;
    const sqlQuery = `SELECT us.name, us.artist, COUNT(us.name) 
                    FROM userssong AS us JOIN user AS u ON us.user_id = u.id 
                    WHERE u.name IN (SELECT u2.name FROM music.user AS u2 WHERE FLOOR((YEAR(NOW())-YEAR(u2.birthday))/10)*10 = ${age} AND gender = '${gender}')
                    GROUP BY us.name HAVING COUNT(us.name) >= 1 ORDER BY 3 DESC LIMIT 3;`;
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.post('/songList', (req, res) => {
    const id = req.body.id;
    const sqlQuery = "select * from userssong where user_id = ?;";
    db.query(sqlQuery,[id], (err, result) => {
        res.send(result);
    });
});

app.post('/searchUser', (req, res) => {
    const id = req.body.id;
    const sqlQuery = "select id, name from user where id LIKE ? ";
    db.query(sqlQuery,[id + "%"], (err, result) => {
        res.send(result);
    });
});


app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });