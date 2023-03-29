import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/logincss.css";
import mic from '../img/mic.png';

function Login() {
    const navigate = useNavigate();
    const idRef = useRef();
    const pwRef = useRef();

    function onClickLogin() {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("ID를 입력하세요");
            idRef.current.focus();
            return false;
        }

        if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("비밀번호를 입력하세요");
            pwRef.current.focus();
            return false;
        }

        axios.post("http://localhost:3001/login", {
            id: idRef.current.value,
            pw: pwRef.current.value,
        }).then((res) => {
            if (res.data[0].cnt === 1) {
                console.log("handleLogin =>", res);
                window.sessionStorage.setItem("id", idRef.current.value); // 세션스토리지에 key : id , value : idRef.current.value로 저장
                window.sessionStorage.setItem("age", res.data[0].age);
                window.sessionStorage.setItem("name", res.data[0].name);
                window.sessionStorage.setItem("gender", res.data[0].gender);
                // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
                navigate("/Main");
              } else {
                alert("아이디, 패스워드가 정확하지 않습니다.");
                idRef.current.value = "";
                pwRef.current.value = "";
                navigate("/");  
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
                    <form>
                        <div><input className="InputBox" type="text" name="id" size="20" placeholder="ID" ref={idRef}></input></div>
                        <div><input className="InputBox" type="password" name="id" size="20" placeholder="PASSWORD" ref={pwRef}></input></div>
                        <div><input className="LoginBtn" type="button" value="로그인" onClick={onClickLogin}></input></div>
                    </form>
                    <div className="SignDiv"><span>아직 계정이 없으신가요?</span><Link to="/SignUp" className="SignUpLink">회원가입</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login; 