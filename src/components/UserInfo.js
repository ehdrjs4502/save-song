import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";
import AddBtn from './AddBtn';
import '../css/info.css'

function UserInfo({match}) {
    const { id } = useParams(); // UserInfo/id -> id 값을 저장
    const[userSongList, setUserSongList] = useState([]);
    const [followList, setFollowList] = useState([]); // 팔로우
    const [followerList, setFollowerList] = useState([]); // 팔로워

    useEffect(() => { // 처음 페이지 로드 될 때 사용자의 음악 가져오기
        axios.post("http://localhost:3001/songList", {
            id : id,
        }).then((res) => {
            setUserSongList(res.data);
        });

        axios.post("http://localhost:3001/followList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowList(res.data);
        });

        axios.post("http://localhost:3001/followerList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowerList(res.data);
        });

    }, []);

    console.log(userSongList);
    return (
        <div>
            <Menu/>
            <div className="infoBox">
                <div>
                    <div className="header">
                        <span>{id}</span>
                        <span>팔로워 : {followerList.length}</span>
                        <span>팔로우 : {followList.length}</span></div>
                    <div>
                        <h2 className="songListTitle">{id}님의 노래 목록</h2>
                    </div>
                    <div>
                        <table className="songTable" style={{textAlign:'center'}}>
                            <tr>
                                <th>번호</th>
                                <th>곡제목</th>
                                <th>가수명</th>
                                <th></th>
                            </tr>
                            {userSongList.map((item, idx) => {
                                return (
                                    <tr>
                                        <td>{idx + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.artist}</td>
                                        <td><AddBtn name = {item.name} artist = {item.artist}/></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;