import axios from "axios"
import { useEffect, useState } from "react"
import AddBtn from './AddBtn';

function PopularChart() {
    const [songList, SetSongList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/getPopularChart")
        .then((res) => {
            console.log(res.data)
            const list = res.data
            SetSongList(list)
        })
    },[])

    console.log(songList)
    

    return(
        <div>
            <div><h1>인기차트</h1></div>
            <div>
                <table style={{textAlign:'center'}}>
                    <tr>
                        <th>순위</th>
                        <th>곡제목</th>
                        <th>가수명</th>
                    </tr>
                    {songList.map((item) => {
                        return (
                            <tr>
                                <td>{item.rank}</td>
                                <td>{item.name}</td>
                                <td>{item.artist}</td>
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