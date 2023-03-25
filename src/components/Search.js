import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import AddBtn from './AddBtn';
import Menu from "./Menu";

function Search() {
    const [inputText, setInputText] = useState('');
    const [searchList, setSearchList] = useState([]);


    function onChangeSearch(e) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    }

    const handleOnKeyPress = e => { // input search에서 클릭 했을 때에 함수
        if (e.key === 'Enter') {
          getMusicList(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };

    async function getMusicList() { // 노래 가져오는 함수
        // API_URL 설정
        const API_URL = `/2.0/?method=track.search&track=${inputText}&limit=10&api_key=5ecc7be00cd4341e93c34fac91fa0132&format=json`
        await axios.get(API_URL)
        .then((res) => {
            setSearchList(searchList => []); // searchList를 비워준다.
            const trackList = res.data.results.trackmatches.track; // api에서 가져온 노래 리스트 객체 저장
            console.log(trackList);
            setSearchList(trackList); // searchList에 저장
        })
    }

    return(
        <div>
            <div><h2>Save Song !</h2></div>
            <div><Menu/></div>
            <div>
                <input type="search" className="form-control rounded" placeholder="노래명 또는 가수명 입력" onKeyPress={handleOnKeyPress} onKeyUp={getMusicList} onChange={onChangeSearch}/> 
                <button type="button" id="search_btn" onClick={getMusicList}>검색</button>
            </div>

            <div>
                {searchList.map((item) => {
                    return (
                        <div>
                            <ul>
                                <li key={item.index}>{item.name} / {item.artist} <AddBtn name = {item.name} artist = {item.artist}/></li>
                            </ul>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Search;