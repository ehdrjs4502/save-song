import axios from "axios";
import Menu from "../components/Menu";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import LikeBtn from "../components/LikeBtn";
import '../css/song.css';
import Footer from "components/Footer";


function Song({match}: {match:string}) {
    const [SongID, SetSongID] = useState<string>(""); // 유튜브 영상 id
    const { title } = useParams<string>();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo")!); // 유저 정보

    async function getMusicList(keyword: string) { // 유튜브 노래 영상 가져오는 함수
        const search = keyword + " 가사";
        const API_URL = `https://www.googleapis.com/youtube/v3/search?part=id&q=${search}&maxResults=1&fields=items(id(videoId))&key=AIzaSyD6uIASZdxDE7ynF7G5fqaKzW4MnkJHBm0`
        await axios.get(API_URL)
        .then((res) => {
            console.log(res);
            SetSongID(res.data.items[0].id.videoId);
        });
    };

    useEffect(() => {
        getMusicList(title!);
    },[]);

    return (
        <div>
            <Menu/>
            <div className="wrap">
                <div className="youtube-box">
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${SongID}`} playing controls/>
                </div>
                <div className="like-box">
                    <LikeBtn songTitle={title!.split(" ")[0]} songArtist={title!.split(" ")[1]} userID={userInfo['id']}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Song;