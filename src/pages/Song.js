import axios from "axios";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

function Song({match}) {
    const [SongID, SetSongID] = useState("");
    const { title } = useParams();

    async function getMusicList(keyword) { // 노래 가져오는 함수
        const search = keyword + " 가사";
        const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=1&key=`
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
        </div>
    )
}

export default Song;