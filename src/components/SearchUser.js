import Menu from "./Menu";
import axios from "axios";
import React, { useState } from "react";
import FollowBtn from "./FollowBtn";
import { Link } from "react-router-dom";
import '../css/search.css';
import search from '../img/search.png';

function SearchUser() {
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState([]);
    const id = JSON.parse(sessionStorage.getItem("userInfo")).id;
    
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
        await axios.post("http://localhost:3001/search/searchUser", {
            id : inputText,
        }).then((res) => {
            setSearchList(searchList => []); // searchList를 비워준다.
            setSearchList(res.data); // searchList에 저장
        })
    };

    return(
        <div>
            <div>
                <Menu/>
            </div>
            <div className="searchBox">
                <div className="searchForm">
                    <input type="search" className="searchInput" placeholder="유저 아이디 입력" onKeyPress={handleOnKeyPress} onKeyUp={getUserList} onChange={onChangeSearch}/> 
                    <button type="button" className="searchBtn" onClick={getUserList}><img className="searchImg" alt="searchImg" src={search}/></button>
                </div>
            </div>

            <div>
                {searchList.map((item) => {
                    return (
                        <div>
                            <ul>
                                <li><Link to={`/UserInfo/${item.id}`}>{item.id} / {item.name} </Link><FollowBtn toId = {item.id} fromId = {id}/></li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchUser;