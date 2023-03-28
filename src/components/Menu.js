import { Link, useNavigate } from "react-router-dom";
import mic from '../img/mic.png';

function Menu() {
    const navigate = useNavigate();

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
        <div>
            <div><h2><img src={mic} style={{width:"50px"}}/>Save Song !</h2></div>
            <div>
                <ul>
                    <li><Link to="/Main">Top 100</Link></li>
                    <li><Link to="/Search">노래 검색</Link></li>
                    <li><Link to="/SearchUser">사용자 검색</Link></li>
                    <li><Link to="/MyInfo">My Info</Link></li>
                </ul>
            </div>
            <div>{window.sessionStorage.getItem("name")}</div>
            <div><button onClick={onClickLogOut}>로그아웃</button></div>
        </div>
    )
}

export default Menu;