import axios from "axios";
import { useEffect, useState } from "react";
import AddBtn from "./AddBtn";
import { Link } from "react-router-dom";

function AgeGroupTop(props) {
    const [topList, SetTopList] = useState([]);
    //.replace(/.$/, '0');
    const ageGroup = props.userAge.toString().replace(/.$/, '0');
    const gender = props.userGender;
    console.log(gender);

    useEffect(() => {
        axios.post("http://localhost:3001/song/getTopSongList", {
            age : ageGroup, 
            gender : gender,
        }).then((res) => {
            const list = res.data;
            console.log(res.data);
            SetTopList(list);
        });
    },[]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <div style={{fontSize:'12px', marginTop:'15%'}}>
            <div><h2>{ageGroup}대 {gender}성 Top 3</h2></div>
            <div>
                <table className="topTable" style={{textAlign:'center'}}>
                    <tr>
                        <th>순위</th>
                        <th>곡제목</th>
                        <th>가수명</th>
                        <th></th>
                    </tr>
                    {topList.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td><Link to={`/Song/${item.name} ${item.artist}`}>{truncate(item.name, 10)}</Link></td>
                                <td>{truncate(item.artist,10)}</td>
                                <td><AddBtn size = 'small'  name = {item.name} artist = {item.artist}/></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default AgeGroupTop;