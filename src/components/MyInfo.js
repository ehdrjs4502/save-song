import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import Modal from 'react-modal';
import Followings from "./Followings";
import Followers from "./Followers";
import "../css/info.css";

function MyInfo() {
    const modalStyle = { // 모달 창 스타일
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
            // display: "flex",
            // justifyContent: "center",
            background: "rgb(255, 255, 255)",
            overflow: "auto",
            top: "15vh",
            left: "38vw",
            right: "38vw",
            bottom: "30vh",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            zIndex: 10,
        },
    };

    const id = JSON.parse(sessionStorage.getItem("userInfo")).id; // 로그인한 session id
    const name = JSON.parse(sessionStorage.getItem("userInfo")).name;
    const [myList, SetMyList] = useState([]);
    const [followList, setFollowList] = useState([]); // 팔로우
    const [followIsOpen, setFollowIsOpen] = useState(false); // 팔로우 눌렀을 때 모달 창 상태
    const [followerList, setFollowerList] = useState([]); // 팔로워
    const [followerIsOpen, setFollowerIsOpen]= useState(false); // 팔로워 눌렀을 때 모달 창 상태
    console.log("MyInfo : ", id);

    useEffect(() => {
        axios.post("http://localhost:3001/songList", {  // 처음 페이지 로드 될 때 사용자의 음악 가져오기
            id : id,
        }).then((res) => {
            console.log(res);
            SetMyList(res.data);
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

    console.log("팔로우 : ", followList);
    console.log("팔로워 : ", followerList);

    function onClickDelBtn(name, artist) { // 삭제 버튼을 눌렀을 때
        console.log(name, artist);

        axios.post("http://localhost:3001/delSong", { // addSong 서버 api 호출
            id : id, // 현재 세션에 있는 id (로그인한 id)
            name : name, // 노래명
            artist : artist, // 가수명
        }).then((res) => { // 서버에서 res 가져옴
            console.log("delSong => ", res);

            if(res.data.affectedRows === 1) { // 잘 됐으면
                alert(name + " 제거했습니다.");
                axios.post("http://localhost:3001/songList", { // db에 사용자가 저장한 음악 다시 가져오자
                    id : id,
                }).then((res) => {
                    console.log(res);
                    SetMyList(res.data); // myList에 가져온 데이터 저장
                });
            } else { // 잘 안 됐으면 ㅠㅠ
               alert("오류!!") 
            };
        }).catch((e) => {
            console.error(e)
        });
    };

    return(
        <div>
            <Menu/>
            <div className="infoBox">
                <div>
                    <div className="header">
                        <span>{name}</span>
                        <span onClick={() => setFollowerIsOpen(true)}>팔로워 : {followerList.length}</span> 
                        <span onClick={() => setFollowIsOpen(true)}>팔로우 :  {followList.length}</span>
                        </div>
                    <div>
                        <h2 className="songListTitle">{name}님의 노래 목록</h2>
                    </div>
                    <div>
                        {myList.length === 0 ? (<div><h3>노래를 추가해주세요~</h3></div>) : 
                        (<div>
                            <table className="songTable" style={{textAlign:'center'}}>
                                <tr>
                                    <th>번호</th>
                                    <th>곡제목</th>
                                    <th>가수명</th>
                                    <th></th>
                                </tr>
                                {myList.map((item, idx) => {
                                    return (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.artist}</td>
                                            <td><button className="delSongBtn" onClick={() => onClickDelBtn(item.name, item.artist)}>X</button></td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>)}
                    </div>
                </div>
            </div>
            <Modal style={modalStyle} isOpen={followIsOpen} onRequestClose={() => setFollowIsOpen(false)}>
                <Followings followList = {followList}/>
            </Modal>
            <Modal style={modalStyle} isOpen={followerIsOpen} onRequestClose={() => setFollowerIsOpen(false)}>
                <Followers followerList = {followerList}/>
            </Modal>
        </div>
    )
}

export default MyInfo;