import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";

function UserInfo({match}) {
    const { id } = useParams(); // UserInfo/id -> id 값을 저장
    const[userSongList, setUserSongList] = useState([]);

    useEffect(() => { // 처음 페이지 로드 될 때 사용자의 음악 가져오기
        axios.post("http://localhost:3001/songList", {
            id : id,
        }).then((res) => {
            setUserSongList(res.data);
        });
    }, []);

    console.log(userSongList);
    return (
        <div>
            <Menu/>
            <div><span>팔로우 : </span> / <span>팔로잉 : </span></div>
            <div>
                <h2>{id}님의 노래 목록</h2>
            </div>
            <div>
                <table style={{textAlign:'center'}}>
                    <tr>
                        <th>번호</th>
                        <th>곡제목</th>
                        <th>가수명</th>
                    </tr>
                    {userSongList.map((item, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.artist}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default UserInfo;