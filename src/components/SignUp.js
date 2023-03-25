import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const now = new Date();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        year: now.getFullYear(),
        month: "01",
        day: "01",
      });

    const nameRef = useRef();
    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const [gender, setGender] = useState("남");
    const [idCheck, setIdCheck] = useState(false);

    function checkId() {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요!!!");
            idRef.current.focus();
            return false;
        }

        axios.post("http://localhost:3001/checkId", {
            id : idRef.current.value,
        }).then((res) => {
            console.log("checkId =>", res.data.tf);
            setIdCheck(res.data.tf)
            if(res.data.tf) alert("사용 가능한 ID입니다")

            if(!res.data.tf) {
                alert("중복된 아이디입니다. 다른 ID를 사용해주세요");
                idRef.current.focus();
            }
        }).catch((e) => {
            console.error(e)
        })

    }

    //회원가입 버튼 눌렀을 때 동작하는 함수 
    function onClickSignUp() {
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

        if(!idCheck) {
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

        axios.post("http://localhost:3001/signUp", {
            id : idRef.current.value,
            pw : pwRef.current.value,
            name : nameRef.current.value,
            gender : gender,
            birthday : form.year + "-" + form.month + "-" + form.day,
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

    
    let years = [];
    for (let y = now.getFullYear(); y >= 1930; y -= 1) {
        years.push(y);
    }

    let month = [];
    for (let m = 1; m <= 12; m += 1) {
        if (m < 10) {
        // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
        month.push("0" + m.toString());
        } else {
        month.push(m.toString());
        }
    }
    let days = [];
    let date = new Date(form.year, form.month, 0).getDate();
    for (let d = 1; d <= date; d += 1) {
        if (d < 10) {
        // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
        days.push("0" + d.toString());
        } else {
        days.push(d.toString());
        }
    }

    return(
        <div>
            <div><h1>SignUp !</h1></div>
            <div>
                <form>
                    <div><input type="text" name="name" size="20" placeholder="NAME" ref={nameRef}></input></div>
                    <div>
                        <input type="text" name="id" size="20" placeholder="ID" ref={idRef}></input>
                        <input type="button" value="아이디 중복 확인" onClick={checkId}></input>
                    </div>
                    <div><input type="password" name="pw" size="20" placeholder="PASSWORD" ref={pwRef}></input></div>
                    <div><input type="password" name="pwCheck" size="20" placeholder="PASSWORD CHECK" ref={pwCheckRef}></input></div>
                    <div>
                        <input type="radio" name="gender" value="남" defaultChecked onChange={onClickGender}/>남
                        <input type="radio" name="gender" value="여" onChange={onClickGender}/>여
                    </div>
                    <div>
                        <span>생년월일</span>
                        <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                            {years.map(item => ( <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })}>
                            {month.map(item => ( <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
                            {days.map(item => ( <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <div><input type="button" value="회원가입" onClick={onClickSignUp}></input></div>
                    </div>
                </form>
            </div>
        
        </div>
     
    )
}

export default SignUp; 