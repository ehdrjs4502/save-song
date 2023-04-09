import Menu from "./Menu";
import axios from "axios";
import React, { useState } from "react";
import FollowBtn from "./FollowBtn";

function SearchUser() {
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [follow, setFollow] = useState("팔로우");
    const id = window.sessionStorage.getItem("id");
    console.log(id);
    

    function onChangeSearch(e) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    };

    const handleOnKeyPress = e => { // input search에서 클릭 했을 때에 함수
        if (e.key === 'Enter') {
            getUserList(); // Enter 입력이 되면 클릭 이벤트 실행
        };
    };

    async function getUserList() { // 유저 가져오는 함수
        console.log(inputText);
        if(inputText === "") {
            setSearchList(searchList => []);
            return;
        }
        await axios.post("http://localhost:3001/searchUser", {
            id : inputText,
        }).then((res) => {
            setSearchList(searchList => []); // searchList를 비워준다.
            setSearchList(res.data); // searchList에 저장
        })
    };

    return(
        <div>
            <div><Menu/></div>
            <div>
                <input type="search" className="form-control rounded" placeholder="유저 아이디 입력" onKeyPress={handleOnKeyPress} onKeyUp={getUserList} onChange={onChangeSearch}/> 
                <button type="button" id="search_btn" onClick={getUserList}>검색</button>
            </div>

            <div>
                {searchList.map((item) => {
                    return (
                        <div>
                            <ul>
                                <li>{item.id} / {item.name} <FollowBtn toId = {item.id} fromId = {id}/></li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchUser;