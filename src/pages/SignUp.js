import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/signup.css";
import {Box, TextField, Button} from '@mui/material';

function SignUp() {
    const navigate = useNavigate();
    const birthdayRef = useRef("");
    const nameRef = useRef("");
    const idRef = useRef("");
    const pwRef = useRef("");
    const pwCheckRef = useRef("");
    const [gender, setGender] = useState("남");
    const [idCheck, setIdCheck] = useState(true);
    const [checkErr, SetCheckErr] = useState("");

    const [num, setNum] = useState();

    const handleChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setNum(e.target.value);
        }

        console.log(num);
    };

    function checkId() {
        axios.post("http://localhost:3001/signUp/checkId", {
            id : idRef.current.value,
        }).then((res) => {
            console.log("checkId =>", res.data.tf);
            setIdCheck(res.data.tf)
            if(res.data.tf) {
                // console.log("사용 가능한 ID입니다",idRef.current.value);
                SetCheckErr("");
            } 

            if(!res.data.tf) {
                // console.log("중복된 아이디입니다. 다른 ID를 사용해주세요");
                // SetCheckErr("중복된 아이디입니다. 다른 ID를 사용해주세요");
                idRef.current.focus();
            }
        }).catch((e) => {
            console.error(e)
        })
    }

    //회원가입 버튼 눌렀을 때 동작하는 함수 
    function onClickSignUp() {
        console.log(idRef.current.value);
        const numCheck = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
        if (nameRef.current.value === "" || nameRef.current.value === undefined) {
            alert("이름을 입력하세요");
            nameRef.current.focus();
            return false;
        }

        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요!!!");
            idRef.current.focus();
            return false;
        }

        if (!idCheck) {
            alert("아이디 중복을 확인해주세요!!");
            idRef.current.focus();
            return false;
        }

        if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("패스워드를 입력하세요!!!");
            pwRef.current.focus();
            return false;
        }

        if (pwCheckRef.current.value === "" || pwCheckRef.current.value === undefined) {
            alert("패스워드 확인을 입력하세요!!!");
            pwCheckRef.current.focus();
            return false;
        }

        if (pwRef.current.value !== pwCheckRef.current.value) {
            alert("비밀번호를 확인해주세요");
            pwRef.current.focus();
            return false;
        }

        if (!numCheck.test(birthdayRef.current.value)) {
            alert("생년월일을 확인해주세요 ex)20001130");
            birthdayRef.current.focus();
            return false;
        }

        axios.post("http://localhost:3001/signUp", {
            id : idRef.current.value,
            pw : pwRef.current.value,
            name : nameRef.current.value,
            gender : gender,
            birthday : birthdayRef.current.value,
        }).then((res) => {
            console.log("signUp =>", res);
            // 로그인 성공여부는 res.data.affectedRows가 0인지 1인지 확인하면 됨
            if (res.data.affectedRows === 1) {
                alert("회원가입 성공!");
                navigate("/");
            }
            else alert("회원가입 실패!!!");
        }).catch((e) => {
            console.error(e)
        })
    } 

    //성별 클릭했을 때 동작하는 함수
    const onClickGender = (e) => {
        setGender(e.target.value)
    }

    return(
        <div className="SignUpBody">
            <div className="SignUpBox">
                <div><h1>SignUp !</h1></div>
                <div>
                    <Box component="form" sx={{
                        '& .MuiTextField-root': { m: 2, width: '42ch', height: '6ch'},
                    }}
                    noValidate autoComplete="off">
                        <div>
                            <TextField id="outlined-basic" label="Name" type="text" variant="outlined" inputRef={nameRef} />
                            <TextField id="outlined-basic" label="ID" type="text" variant="outlined" onChange={checkId} error={!idCheck} helperText={!idCheck ? "중복된 아이디입니다. 다른 ID를 사용해주세요" : ""} inputRef={idRef}/>
                            <TextField id="filled-password-input" label="Password" type="password" variant="outlined"  inputRef={pwRef}/>
                            <TextField id="filled-password-input" label="Password Check" type="password" variant="outlined" inputRef={pwCheckRef}/>
                            <div className="GenderRadio">
                                <input type="radio" name="gender" id="man" value="남" defaultChecked onChange={onClickGender}/><label htmlFor="man">남자</label>
                                <input type="radio" name="gender" id="woman" value="여" onChange={onClickGender}/><label htmlFor="woman">여자</label>
                            </div>
                            <TextField id="outlined-basic" label="BirthDay" helperText="ex)20001130" type="text" variant="outlined" inputRef={birthdayRef} inputProps={{maxLength : 8}} onChange={(e) => handleChange(e)} value={num || ""}/>
                        </div>
                        <Button variant="contained" onClick={onClickSignUp}>회원가입</Button>
                    </Box>
                    <div className="GoToLogin">
                        <span><Link to="/">로그인 페이지로 돌아가기</Link></span>
                    </div>
                    {/* <form>
                        <div><input className="InputBox" type="text" name="name" size="20" placeholder="NAME" ref={nameRef}></input></div>
                        <div>
                            <input className="InputBox" type="text" name="id" size="20" placeholder="ID" onChange={checkId} ref={idRef}></input>
                        </div>
                        
                        <div><input className="InputBox" type="password" name="pw" size="20" placeholder="PASSWORD" ref={pwRef}></input></div>
                        <div><input className="InputBox" type="password" name="pwCheck" size="20" placeholder="PASSWORD CHECK" ref={pwCheckRef}></input></div>
                        
                        <div>
                            <input className="InputBox" type="text" name="birthday" size="20" placeholder="BirthDay ex)20001130" ref={birthdayRef}></input>
                            <div><input className="SignUpBtn" type="button" value="회원가입" onClick={onClickSignUp}></input></div>
                            
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
     
    )
}

export default SignUp; 