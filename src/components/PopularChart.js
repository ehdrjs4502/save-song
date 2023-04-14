import axios from "axios"
import { useEffect, useState } from "react"
import AddBtn from './AddBtn';
import '../css/table.css'

function PopularChart() {
    const [songList, SetSongList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/song/getPopularChart")
        .then((res) => {
            const list = res.data
            SetSongList(list)
            console.log(list)
        })
    },[])

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return(
        <div style={{}}>
            <div><h2>인기차트</h2></div>
            <div>
                <table className="popularTable" style={{textAlign:'center'}}>
                    <tr>
                        <th>순위</th>
                        <th>곡제목</th>
                        <th>가수명</th>
                        <th></th>
                    </tr>
                    {songList.map((item) => {
                        return (
                            <tr>
                                <td>{item.popular_rank}</td>
                                <td>{truncate(item.name,25)}</td>
                                <td>{truncate(item.artist,15)}</td>
                                <td><AddBtn name = {item.name} artist = {item.artist}/></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default PopularChart