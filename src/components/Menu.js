import { Link, useLocation, useNavigate } from "react-router-dom";
import mic from '../img/mic.png';
import "../css/menu.css";

function Menu() {
    const navigate = useNavigate();
    const userName = window.sessionStorage.getItem("name")
    const pathName = useLocation().pathname;

    function onClickLogOut() { //로그아웃 버튼 눌렀을 때 함수
        console.log("handleLogout");
        window.sessionStorage.clear(); // 세션 삭제
        console.log(
        "handleLogout:window.sessionStorage(login_id) =>",
        window.sessionStorage.getItem("id")
        );
        navigate("/"); // 로그인 페이지로 이동
    }

    return(
        <div className="menuBox" style={{borderBottom:'1px solid black'}}>
            <div className="headerLogo">
                <Link to="/Main">
                    <img src={mic} style={{width:"50px"}}/>
                    <h2>Save Song !</h2>
                </Link>
            </div>
            <div>
                <ul>
                    <li><Link style={pathName === "/Main" ? {color : 'blue'} : {color : 'black'}} to="/Main">Top 100</Link></li>
                    <li><Link style={pathName === "/Search" ? {color : 'blue'} : {color : 'black'}} to="/Search">노래 검색</Link></li>
                    <li><Link style={pathName === "/SearchUser" ? {color : 'blue'} : {color : 'black'}} to="/SearchUser">사용자 검색</Link></li>
                    <li><Link style={pathName === "/MyInfo" ? {color : 'blue'} : {color : 'black'}} to="/MyInfo">My Info</Link></li>
                </ul>
            </div>
            <div><span className="userName">{userName}</span> <button className="logoutBtn" onClick={onClickLogOut}>로그아웃</button></div>
        </div>
    )
}

export default Menu;