import axios from "axios";
import React, { useState, useMemo, ChangeEvent } from "react";
import AddBtn from '../components/AddBtn';
import Menu from "../components/Menu";
import '../css/search.css';
import search from '../img/search.png';
import { Link } from "react-router-dom";
import { FadeLoader } from 'react-spinners';

type SearchList = {name: string, artist: string};

function Search() {
    const [inputText, setInputText] = useState(''); // 검색 텍스트
    const [searchList, setSearchList] = useState<SearchList[]>([]); // 검색 결과 목록
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [searchAttempted, setSearchAttempted] = useState(false); // 검색 했는지 상태

    function onChangeSearch(e: ChangeEvent<HTMLInputElement>) { // Search 인풋 태그에 변화가 생길때
        setInputText(e.target.value);
    };

    const handleOnKeyPress = (e: React.KeyboardEvent) => { // input search에서 클릭 했을 때에 함수
        if (e.key === 'Enter') {
            getMusicList(); // Enter 입력이 되면 클릭 이벤트 실행
        };
    };

    async function getMusicList() { // 노래 가져오는 함수
        setSearchAttempted(true);
        setLoading(true);
        // API_URL 설정
        const API_URL = `/2.0/?method=track.search&track=${inputText}&limit=10&api_key=5ecc7be00cd4341e93c34fac91fa0132&format=json`
        await axios.get(API_URL)
        .then((res) => {
            setSearchList(searchList => []); // searchList를 비워준다.
            const trackList = res.data.results.trackmatches.track; // api에서 가져온 노래 리스트 객체 저장
            console.log(trackList);
            setSearchList(trackList); // searchList에 저장
        })
        .finally(() => {
            setLoading(false); // 로딩 상태 해제
        });
    };

    const truncate = useMemo(() => { // 곡제목, 가수명 길면 자르는 함수
        return (str: string, n: number) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
        };
    }, []);

    return(
        <div>
            <div><Menu/></div>
            <div className="search-box">
                <div className="search-form">
                    <input type="search" className="search-input" placeholder="노래명 또는 가수명 입력" onKeyPress={handleOnKeyPress} onChange={onChangeSearch}/> 
                    <button type="button" className="search-btn" onClick={getMusicList}><img className="search-img" alt="searchImg" src={search}/></button>
                </div>
            </div> 

            {loading ? ( // 로딩 중일 때 로딩 스피너 표시
                <div className="loading-box">
                    <FadeLoader color="#2E2EFE" loading={loading} />
                </div>
            ) : searchList.length === 0 && searchAttempted ? (
                <div className="loading-box">
                    <h3>검색 결과가 없습니다...</h3>
                </div>
            ) : searchList.length > 0 ? (
                <div className="list-box">
                    <div>
                        <table className="search-table">
                            <thead>
                                <tr>
                                    <th>곡제목</th>
                                    <th>가수명</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {searchList.map((item, idx) => {
                                return (
                                    <tr key={idx    }>
                                        <td>
                                            <Link to={`/Song/${item.name.replace(/ /g, '')} ${item.artist.replace(/ /g, '')}`}>
                                                {truncate(item.name, 30)}
                                            </Link>
                                        </td>
                                        <td>
                                            {truncate(item.artist, 20)}
                                        </td>
                                        <td>
                                            <AddBtn name={item.name} artist={item.artist} />
                                        </td>
                                    </tr>   
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Search;