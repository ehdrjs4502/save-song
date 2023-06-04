import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import AddBtn from "./AddBtn";
import { Link } from "react-router-dom";
import '../css/song-list.css'

interface SongListProps {
    id: string;
    name: string;
}

type SongList = {popular_rank: number, name: string, artist: string};

function SongList(props: SongListProps) {
    
    const [songList, setSongList] = useState<SongList[]>([]);
    const userID: string = props.id; // 현재 노래 목록 아이디 (다른 유저 노래 목록 보면 바뀜)
    const loginID: string = JSON.parse(sessionStorage.getItem("userInfo")!).id; // 로그인한 아이디
    const name: string = props.name; // 이름

    function getSongList() {
        axios.post("http://localhost:3001/song/songList", {  // 처음 페이지 로드 될 때 사용자의 음악 가져오기
        id : userID,
        }).then((res) => {
            setSongList(res.data);
        });
    }
    
    useEffect(() => {
        getSongList();
    }, []);

    function onClickDelBtn(name: string, artist: string) { // 삭제 버튼을 눌렀을 때
        if(window.confirm(name + " 정말로 삭제하시겠습니까?")) {
            axios.post("http://localhost:3001/song/delSong", { // addSong 서버 api 호출
                id : userID, // 현재 세션에 있는 id (로그인한 id)
                name : name, // 노래명
                artist : artist, // 가수명
            }).then((res) => { // 서버에서 res 가져옴
                if(res.data.affectedRows === 1) { // 잘 됐으면
                    alert(name + " 제거했습니다.");
                    getSongList();
                } else { // 잘 안 됐으면 ㅠㅠ
                alert("오류!!") 
                };
            }).catch((e) => {
                console.error(e)
            });
        }
    };

    const truncate = useMemo(() => {
        return (str: string, n: number) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
        };
    }, []);

    return(
        <div>
            <div>
                <h2 className="song-list-title">{name}님의 노래 목록</h2>
            </div>
            <div className="song-list-box">
                {songList.length === 0 ? (<div><h3>노래를 추가해주세요~</h3></div>) : 
                (<div className="song-table-box">
                    <table className="song-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>곡제목</th>
                                <th>가수명</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/Song/${item.name.replace(/ /g, '')} ${item.artist.replace(/ /g, '')}`}>{truncate(item.name, 30)}</Link></td>
                                            <td>{truncate(item.artist, 20)}</td>
                                        
                                        <td>
                                            {userID === loginID ? 
                                                <button className="del-song-btn" onClick={() => onClickDelBtn(item.name, item.artist)}>X</button> : 
                                                <AddBtn name = {item.name} artist = {item.artist}></AddBtn>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>)}
            </div>
        </div>
    )
}

export default SongList;