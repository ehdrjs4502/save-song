import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";
import AddBtn from './AddBtn';
import '../css/info.css'
import SongList from "./SongList";

function UserInfo({match}) {
    const { id } = useParams(); // UserInfo/id -> id 값을 저장
    const [followList, setFollowList] = useState([]); // 팔로우
    const [followerList, setFollowerList] = useState([]); // 팔로워
    const [name, setName] = useState('');
    useEffect(() => {
        axios.post("http://localhost:3001/user/userName", { // 이름 불러오기
            id : id,
        }).then((res) => {
            setName(res.data[0].name);
        });

        axios.post("http://localhost:3001/follow/followList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowList(res.data);
        });

        axios.post("http://localhost:3001/follow/followerList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowerList(res.data);
        });

    }, []);

    return (
        <div>
            <Menu/>
            <div className="infoBox">
                <div className="headerBox">
                    <div className="header">
                        <span>{name}</span>
                        <span>팔로워 : {followerList.length}</span>
                        <span>팔로우 : {followList.length}</span>
                    </div>
                </div>
                <SongList id = {id} name = {name}></SongList>
            </div>
        </div>
    )
}

export default UserInfo;