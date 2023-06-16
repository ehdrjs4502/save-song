import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import axios from "axios";
import Modal from 'react-modal';
import Followings from "../components/Followings";
import Followers from "../components/Followers";
import "../css/info.css";
import SongList from "../components/SongList";
import Footer from "components/Footer";

interface ModalStyle {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
}

function MyInfo() {
    const modalStyle: ModalStyle = { // 모달 창 스타일
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 10,
        },
        content: {
            background: "rgb(255, 255, 255)",
            overflow: "auto",
            top: "15vh",
            left: "35vw",
            right: "35vw",
            bottom: "30vh",
            minWidth: "250px",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            zIndex: 10,
        },
    };

    const id:string = JSON.parse(sessionStorage.getItem("userInfo")!).id; // 로그인한 session id
    const name:string = JSON.parse(sessionStorage.getItem("userInfo")!).name;
    const [followList, setFollowList] = useState<[]>([]); // 팔로우
    const [followIsOpen, setFollowIsOpen] = useState<boolean>(false); // 팔로우 눌렀을 때 모달 창 상태
    const [followerList, setFollowerList] = useState<[]>([]); // 팔로워
    const [followerIsOpen, setFollowerIsOpen]= useState<boolean>(false); // 팔로워 눌렀을 때 모달 창 상태

    const getFollowList = () => {
        axios.post("http://localhost:3001/follow/followList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowList(res.data);
        });
    }

    const getFollowerList = () => {
        axios.post("http://localhost:3001/follow/followerList", { // 팔로우 리스트 가져오기
            id : id,
        }).then((res) => {
            setFollowerList(res.data);
        });
    }


    useEffect(() => {
        getFollowList();
        getFollowerList();
    }, [followList.length]);

    return(
        <div>
            <div className="wrap">
                <Menu/>
                <div className="info-box">
                    <div className="header-box">
                        <div className="header">
                            <span onClick={() => setFollowerIsOpen(true)}>팔로워 : {followerList.length}</span> 
                            <span onClick={() => setFollowIsOpen(true)}>팔로우 :  {followList.length}</span>
                        </div>
                    </div>
                    <SongList id = {id} name = {name}/>
                </div>


                <Modal style={modalStyle} ariaHideApp={false} isOpen={followIsOpen} onRequestClose={() => setFollowIsOpen(false)}>
                    <Followings followList = {followList} fromID = {id}/>
                </Modal>

                <Modal style={modalStyle} ariaHideApp={false} isOpen={followerIsOpen} onRequestClose={() => setFollowerIsOpen(false)}>
                    <Followers followerList = {followerList}/>
                </Modal>
            </div>
            <Footer/>
        </div>
    )
}

export default MyInfo;