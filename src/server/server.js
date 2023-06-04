const express    = require('express'); // express 라이브러리 연동
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRouter = require('./routers/login-router.js');
const signUpRouter = require('./routers/signup-router.js');
const songRouter = require('./routers/song-router.js');
const searchRouter = require('./routers/search-router.js');
const followRouter = require('./routers/follow-router.js');
const userRouter = require('./routers/user-router.js');
const likeRouter = require('./routers/like-router.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin : [
    'http://localhost:3000',

]})) //cors 오류 해결, 해당 서버에 요청을 보내고 응답을 받을 수 있다.

app.set('port', process.env.PORT || 3001); // port : 3001로 서버 구동

app.get('/',(req, res) => {
    res.send("ㅎㅇ")
});

app.use('/signUp', signUpRouter);

app.use('/login', loginRouter);

app.use('/song', songRouter);

app.use('/search', searchRouter);

app.use('/follow',followRouter);

app.use('/user', userRouter);

app.use('/likes', likeRouter);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
  });