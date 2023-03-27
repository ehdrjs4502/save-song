import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import DelBtn from "./DelBtn";

function MyInfo() {
    const id = window.sessionStorage.getItem("id");
    const [myList, SetMyList] = useState([]);
    console.log("MyInfo : ", id);

    // const getMySongList = async () => {
    //     await axios.post("http://localhost:3001/mySongList", {
    //         id : id,
    //     }).then((res) => {
    //         SetMyList(res.data);
    //     });  
    // };


    // useEffect(() => {
    //     getMySongList();
    // }, [SetMyList]); //[myList] 하면 무한 루프 로그가 엄청 찍힌다.. 왜 와이?

    useEffect(() => {
        axios.post("http://localhost:3001/mySongList", {
            id : id,
        }).then((res) => {
            console.log(res);
            SetMyList(res.data);
        })
    }, []);

    return(
        <div>
            <Menu/>
            <div>
                <h2>나의 노래 목록</h2>
            </div>
            <div>
                <table style={{textAlign:'center'}}>
                        <tr>
                            <th>번호</th>
                            <th>곡제목</th>
                            <th>가수명</th>
                        </tr>
                        {myList.map((item, idx) => {
                        return (
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.artist}</td>
                                <td><DelBtn name = {item.name} artist = {item.artist}/></td>
                            </tr>
                        )
                    })}
                    </table>
            </div>
        </div>
    )

}


export default MyInfo;