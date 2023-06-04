import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import mic from '../img/mic.png';
import Box from '@mui/material/Box';
import {TextField, Button, Stack} from '@mui/material';

function Login() {
    const navigate = useNavigate();
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleOnKeyPress = (e: React.KeyboardEvent) => { // input search에서 클릭 했을 때에 함수
        if (e.key === 'Enter') {
            onClickLogin(); // Enter 입력이 되면 클릭 이벤트 실행
        };
    };

    function onClickLogin() {
        if (!idRef.current?.value) {
            alert("ID를 입력하세요");
            idRef.current?.focus();
            return false;
        }

        if (!pwRef.current?.value) {
            alert("비밀번호를 입력하세요");
            pwRef.current?.focus();
            return false;
        }

        axios.post("http://localhost:3001/login", {
            id: idRef.current.value,
            pw: pwRef.current.value,
        }).then((res) => {
            if (res.data[0].cnt === 1) {
                console.log("handleLogin =>", res);
                console.log(res.data[0]);
                delete res.data[0].cnt;
                window.sessionStorage.setItem("userInfo", JSON.stringify(res.data[0])); // 세션스토리지에 유저 정보 저장
                // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
                navigate("/Main");
              } else {
                if (pwRef.current) {
                    alert("아이디, 패스워드가 정확하지 않습니다.");
                    pwRef.current.value = "";
                    pwRef.current.focus();
                }
              }
        })
    }

    return(
        <div className="LoginBody">
            <div className="LoginBox">
                <div className="HeaderLogo">
                    <img src={mic} className="MicImg"/>
                    <h1 className="Title">Save Song !</h1>
                </div>
                <div>
                    <Box component="form" sx={{
                            '& .MuiTextField-root': { m: 2, width: '42ch', height: '6ch'},
                        }}
                        noValidate autoComplete="off">
                            <div>
                            <TextField id="outlined-required" label="ID" type="text" variant="outlined" inputRef={idRef} />
                            <TextField id="filled-password-input" label="Password" type="password" variant="outlined" inputRef={pwRef} onKeyPress={handleOnKeyPress}/>
                            </div>
                            <Button variant="contained" onClick={onClickLogin} sx={{marginTop: 3}}>로그인</Button>
                    </Box>
                    <div className="SignDiv"><span>아직 계정이 없으신가요?</span><Link to="/SignUp" className="SignUpLink">회원가입</Link></div>
                        {/* <div><input className="InputBox" type="text" name="id" size="20" placeholder="ID" ref={idRef}></input></div>
                        <div><input className="InputBox" type="password" name="id" size="20" placeholder="PASSWORD" ref={pwRef} onKeyPress={handleOnKeyPress}></input></div>
                        <div><input className="LoginBtn" type="button" value="로그인" ></input></div> */}
                </div>
            </div>
        </div>
    )
}

export default Login; 