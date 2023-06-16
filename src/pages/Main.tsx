import React from "react";
import AgeGroupTop from "../components/AgeGroupTop";
import Menu from "../components/Menu";
import PopularChart from "../components/PopularChart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "components/Footer";

type UserInfo = {age: number, gender: string}

function Main() {
    if(sessionStorage.getItem("userInfo") == null ) {
        return(
            <div>
                <h2>로그인 후 사용 가능합니다.</h2>
                <Link to={'/'}>로그인 페이지</Link>
            </div>
        )
    } else {
        const userInfo: UserInfo = JSON.parse(sessionStorage.getItem("userInfo")!);
    
        return(
            <div>
                <Menu/>
                <AgeGroupTop userAge = {userInfo.age} userGender = {userInfo.gender} />
                <PopularChart/>
                <Footer/>
            </div>
        )
    }
    
}

export default Main;