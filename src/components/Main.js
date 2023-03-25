import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import PopularChart from "./PopularChart";

function Main() {
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
            <div><h2>Save Song !</h2></div>
            <div><button onClick={onClickLogOut}>로그아웃</button></div>
            <div><Menu/></div>
            <div>
                <PopularChart/>
            </div>
        </div>
    )
}

export default Main;