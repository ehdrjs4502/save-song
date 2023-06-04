import Menu from "../components/Menu";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import FollowBtn from "../components/FollowBtn";
import { Link } from "react-router-dom";
import '../css/search-user.css';
import search from '../img/search.png';

type SearchList = {id: string, name: string};

function SearchUser() {
    const [inputText, setInputText] = useState<string>('');
    const [searchList, setSearchList] = useState<SearchList[]>([]);
    const id: string = JSON.parse(sessionStorage.getItem("userInfo")!).id;
    
    function onChangeSearch(e: ChangeEvent<HTMLInputElement>) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent) => { // input search에서 클릭 했을 때에 함수
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
            <div className="search-box">
                <div className="search-form">
                    <input type="search" className="search-input" placeholder="유저 아이디 또는 유저명 입력" onKeyPress={handleOnKeyPress} onKeyUp={getUserList} onChange={onChangeSearch}/> 
                    <button type="button" className="search-btn" onClick={getUserList}><img className="search-img" alt="searchImg" src={search}/></button>
                </div>
            </div>

            <div className = "user-list-box">
                <table className = "user-list-table">
                {searchList.map((item) => {
                    return (
                        <tr>
                            <td><Link to={`/UserInfo/${item.id}`}>
                                    {item.id}<br></br>
                                    {item.name} 
                                </Link>
                            </td>
                            <td><FollowBtn toID = {item.id} fromID = {id}/></td>
                        </tr>
                    )
                })}
                </table>
            </div>
        </div>
    )
}

export default SearchUser;