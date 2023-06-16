import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import '../css/info.css'
import SongList from "../components/SongList";
import Footer from "components/Footer";

type ListType = {to_user: string, name: string}

function UserInfo({match}: {match: string}) {
    const { id } = useParams(); // UserInfo/id -> id 값을 저장
    const [followList, setFollowList] = useState<ListType[]>([]); // 팔로우
    const [followerList, setFollowerList] = useState<ListType[]>([]); // 팔로워
    const [name, setName] = useState<string>('');
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

        axios.post("http://localhost:3001/follow/followerList", { // 팔로워 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowerList(res.data);
        });

    }, []);

    return (
        <div>
            <div className="wrap"> 
                <Menu/>
                <div className="info-box">
                    <div className="header-box">
                        <div className="header">
                            <span>팔로워 : {followerList.length}</span>
                            <span>팔로우 : {followList.length}</span>
                        </div>
                    </div>
                    <SongList id = {id!} name = {name}></SongList>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default UserInfo;