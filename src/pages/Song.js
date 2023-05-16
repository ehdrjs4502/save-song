import axios from "axios";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import LikeBtn from "../components/LikeBtn";

function Song({match}) {
    const [SongID, SetSongID] = useState("");
    const { title } = useParams();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    async function getMusicList(keyword) { // 노래 가져오는 함수
        const search = keyword + " 가사";
        const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=1&key=AIzaSyD6uIASZdxDE7ynF7G5fqaKzW4MnkJHBm0`
        await axios.get(API_URL)
        .then((res) => {
            console.log(res);
            SetSongID(res.data.items[0].id.videoId);
        });
    };


    useEffect(() => {
        getMusicList(title);
    },[]);


    return (
        <div>
            <Menu></Menu>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${SongID}`}  playing   controls/>
            <LikeBtn songTitle={title.split(" ")[0]} songArtist={title.split(" ")[1]} userID={userInfo['id']}></LikeBtn>
        </div>
    )
}

export default Song;