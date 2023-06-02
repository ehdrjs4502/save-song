import axios from "axios"
import { useEffect, useState, useMemo } from "react"
import AddBtn from './AddBtn';
import '../css/table.css'
import { Link } from "react-router-dom";

function PopularChart() {
    const [songList, SetSongList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/song/getPopularChart") // 인기차트 가져오기
        .then((res) => {
            const list = res.data;
            SetSongList(list);

        });
    },[]);

    const truncate = useMemo(() => {
        return (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
        };
    }, []);

    return(
        <div style={{display:"flex", alignItems:"center", flexDirection:"column", marginTop:"45px"}}>
            <div style={{alignSelf:"flex-start", marginLeft:"9%"}}><h2>인기차트</h2></div>
            <div style={{width:"85%", overflowX:"auto"}}>
                <table className="popularTable" style={{textAlign:'center', width:"100%"}}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>곡제목</th>
                            <th>가수명</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songList.map((item,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{item.popular_rank}</td>
                                    <td><Link to={`/Song/${item.name.replace(/ /g, '')} ${item.artist.replace(/ /g, '')}`}>{truncate(item.name, 30)}</Link></td>
                                    <td>{truncate(item.artist,15)}</td>
                                    <td><AddBtn name = {item.name} artist = {item.artist}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PopularChart