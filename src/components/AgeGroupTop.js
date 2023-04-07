import axios from "axios";
import { useEffect, useState } from "react";
import AddBtn from "./AddBtn";

function AgeGroupTop() {
    const [topList, SetTopList] = useState([]);
    const ageGroup = window.sessionStorage.age.replace(/.$/, '0');
    const gender = window.sessionStorage.gender;

    useEffect(() => {
        axios.post("http://localhost:3001/getTopSongList", {
            age : ageGroup, 
            gender : gender,
        }).then((res) => {
            const list = res.data;
            console.log(res.data);
            SetTopList(list);
        })
    },[])

    return (
        <div>
            <div><h2>{ageGroup}대 {gender}성 Top 3</h2></div>
            <div>
                <table style={{textAlign:'center'}}>
                    <tr>
                        <th>곡제목</th>
                        <th>가수명</th>
                    </tr>
                    {topList.map((item) => {
                        return (
                            <tr>
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

export default AgeGroupTop;