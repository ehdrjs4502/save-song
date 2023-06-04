import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import mic from '../img/mic.png';
import "../css/menu.css";

function Menu() {
    const navigate = useNavigate();
    const pathName: string = useLocation().pathname;
    const userName: string = JSON.parse(sessionStorage.getItem("userInfo")!).name;

    const selected = {
        color : 'white', 
        borderRadius:'15px', 
        backgroundColor:'#3d7eff',
    }

    function onClickLogOut() { //로그아웃 버튼 눌렀을 때 함수
        console.log("handleLogout");
        window.sessionStorage.clear(); // 세션 삭제
        navigate("/"); // 로그인 페이지로 이동
    }

    return(
        <div className="menuBox" style={{borderBottom:'1px solid black'}}>
            <div className="headerLogo">
                <Link to="/Main">
                    <img className="logo_img" src={mic}/>
                    <h2>Save Song !</h2>
                </Link>
            </div>
            <div className="arrow">
                <span>펼치기</span>
            </div>
            <div className="menu">
                <ul>
                    <Link style={pathName === "/Main" ? selected : {color : 'black'}} to="/Main"><li>Top 100</li></Link>
                    <Link style={pathName === "/Search" ? selected : {color : 'black'}} to="/Search"><li>노래 검색</li></Link>
                    <Link style={pathName === "/SearchUser" ? selected : {color : 'black'}} to="/SearchUser"><li>사용자 검색</li></Link>
                    <Link style={pathName === "/MyInfo" ? selected : {color : 'black'}} to="/MyInfo"><li>My Info</li></Link>
                </ul>
            </div>
            <div className="user">
                <span className="userName">{userName}</span> 
                <button className="logoutBtn" onClick={onClickLogOut}>로그아웃</button>
            </div>
            
        </div>
    )
}

export default Menu;