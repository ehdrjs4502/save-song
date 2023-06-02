import axios from "axios";
import React, { useState } from "react";
import AddBtn from '../components/AddBtn';
import Menu from "../components/Menu";
import '../css/search.css';
import search from '../img/search.png';
import { Link } from "react-router-dom";

function Search() {
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState([]);

    function onChangeSearch(e) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    };

    const handleOnKeyPress = e => { // input search에서 클릭 했을 때에 함수
        if (e.key === 'Enter') {
            getMusicList(); // Enter 입력이 되면 클릭 이벤트 실행
        };
    };

    async function getMusicList() { // 노래 가져오는 함수
        // API_URL 설정
        const API_URL = `/2.0/?method=track.search&track=${inputText}&limit=10&api_key=&format=json`
        await axios.get(API_URL)
        .then((res) => {
            setSearchList(searchList => []); // searchList를 비워준다.
            const trackList = res.data.results.trackmatches.track; // api에서 가져온 노래 리스트 객체 저장
            console.log(trackList);
            setSearchList(trackList); // searchList에 저장
        });
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return(
        <div>
            <div><Menu/></div>
            <div className="searchBox">
                <div className="searchForm">
                    <input type="search" className="searchInput" placeholder="노래명 또는 가수명 입력" onKeyPress={handleOnKeyPress} onChange={onChangeSearch}/> 
                    <button type="button" className="searchBtn" onClick={getMusicList}><img className="searchImg" alt="searchImg" src={search}/></button>
                </div>
            </div>

            {searchList.length == 0 ? '' : 
                <div className="listBox">
                    <div style={{width:"60%"}}>
                        <table className="searchTable" style={{width:"100%"}}>
                            <tr>
                                <th >곡제목</th>
                                <th >가수명</th>
                                <th></th>
                            </tr>
                        {searchList.map((item) => {
                            return (         
                                <tr>
                                    <td><Link to={`/Song/${item.name.replace(/ /g, '')} ${item.artist.replace(/ /g, '')}`}>{truncate(item.name,30)}</Link></td>
                                    <td>{truncate(item.artist,20)} </td>
                                    <td><AddBtn name = {item.name} artist = {item.artist}/></td>
                                </tr>
                            )
                        })}
                        </table>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Search;