import AgeGroupTop from "./AgeGroupTop";
import Menu from "./Menu";
import PopularChart from "./PopularChart";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Main() {
    console.log(sessionStorage.getItem("userInfo"))
    if(sessionStorage.getItem("userInfo") == null ) {
        return(
            <div>
                <h2>로그인 후 사용 가능합니다.</h2>
                <Link to={'/'}>로그인 페이지</Link>
            </div>
        )
    } else {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    
        return(
            <div>
                <div><Menu/></div>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <div></div>
                    <PopularChart/>
                    <AgeGroupTop userAge = {userInfo.age} userGender = {userInfo.gender} />
                </div>
                <div></div>
            </div>
        )
    }
    
}

export default Main;