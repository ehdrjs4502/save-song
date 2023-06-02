import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import AddBtn from "./AddBtn";
import { Link } from "react-router-dom";
import { Autoplay, } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function AgeGroupTop(props) {
    const [topList, SetTopList] = useState([]);
    //.replace(/.$/, '0');
    const ageGroup = props.userAge.toString().replace(/.$/, '0');
    const gender = props.userGender;

    useEffect(() => {
        axios.post("http://localhost:3001/song/getTopSongList", { // 성별,연령대 Top3 가져오기
            age : ageGroup, 
            gender : gender,
        }).then((res) => {
            const list = res.data;
            SetTopList(list);
        });
    },[]);

    const truncate = useMemo(() => {
        return (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
        };
    }, []);


    return (
        <div style={{float:"right", position:"absolute", right:"5%"}}>
            <div style={{display:"flex", alignItems:"center", fontSize:13}}>
                <h3>{ageGroup}대 {gender}성 Top 3</h3>
                <Swiper slidesPerView="1"
                            mousewheel={true}
                            direction="vertical"
                            autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            modules={[Autoplay]}
                            loop={true}
                            style={{width:350, height:30, marginTop:12}}>
                    {topList.map((item, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                <div style={{display:"flex", justifyContent:"space-around"}}>
                                    <span>{idx + 1}</span>
                                    <span>
                                        <Link to={`/Song/${item.name.replace(/ /g, '')} ${item.artist.replace(/ /g, '')}`}>
                                            {truncate(item.name, 7)}
                                        </Link>
                                    </span>
                                    <span>{truncate(item.artist,5)}</span>
                                    <span>
                                        <AddBtn size = 'small'  name = {item.name} artist = {item.artist}/>
                                    </span>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default AgeGroupTop;