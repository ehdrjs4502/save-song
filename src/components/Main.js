import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import XMLParser from "react-xml-parser"; // xml을 json형식으로 변경하기 위한 라이브러리
import default_Img from "../img/indo.png"

function Main() {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState([]);

    function onClickLogOut() {
        console.log("handleLogout");
        window.sessionStorage.clear(); // 세션 삭제
        console.log(
        "handleLogout:window.sessionStorage(login_id) =>",
        window.sessionStorage.getItem("id")
        );
        navigate("/"); // 로그인 페이지로 이동
    }

    function onChangeSearch(e) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    }

    async function parseStr(dataSet) { // XML 형식을 JSON 바꾸는 함수
        setSearchList(searchList => []);
        const dataArr = await new XMLParser().parseFromString(dataSet).children;
        const list = [];
        for(let i = 8; i < dataArr[0].children.length; i++) {
            const music = {name : dataArr[0].children[i].children[0].value.slice(0, -1),
                            artist :  dataArr[0].children[i].children[9].children[1].value.slice(0, -1),
                            image : dataArr[0].children[i].children[8].children[3].value.slice(0, -1)}

            list.push(music);
            console.log(list);
        }
        setSearchList(list);
    }

    async function onClickSearchBtn() {
        const API_URL = `/api/search/${inputText}/?sr=song&display=10&key=example&v=0.5`
        await axios.get(API_URL)
        .then((res) => {
            parseStr(res.data) // XML 형식을 JSON을 바꾸기 
            console.log(res.data)
        })
    }

    let imgStyle = {
        width:"50px",
        height:"50px",

    }    

    const onErrorImg = (e) => {
        e.target.src = default_Img
    }

    return(
        <div>
            <div><h1>메인입니당</h1></div>
            <div><button onClick={onClickLogOut}>로그아웃</button></div>
            
            <div>
                <input type="search" className="form-control rounded" placeholder="노래 제목 입력" onChange={onChangeSearch}/>
                <button type="button" id="search_btn" onClick={onClickSearchBtn}>검색</button>
            </div>

            <div>
                {searchList.map((item) => {
                    return(
                        <div><img src={item.image} style={imgStyle} alt="이미지" onError={onErrorImg}/> {item.name} / {item.artist}</div>
                    )
                })}
            </div>

        </div>
    )
}

export default Main;