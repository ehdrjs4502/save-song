import React from "react";
import "../css/footer.css";
import github from "../img/github.png";
import instagram from "../img/instagram.png"
import { Link } from "react-router-dom";

function Footer() {
    const githubURL = "https://github.com/ehdrjs4502/"
    const instaURL = "https://www.instagram.com/ehdrjs4502/"

    return(
        <div className="footer-box">
            <h3>Made by</h3>
            <span>김동건</span> 
            <span>ehdrjs4502@gmail.com</span>
            <div className="link-box">
                <img src={github} className="github-img" onClick={() => {window.open(githubURL)}}></img>
                <img src={instagram} className="insta-img" onClick={() => {window.open(instaURL)}}></img>
            </div>
        </div>
    )
}

export default Footer;