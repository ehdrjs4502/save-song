import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";

function MyInfo() {
    const id = window.sessionStorage.getItem("id");
    const [myList, SetMyList] = useState([]);
    console.log("MyInfo : ", id);

    useEffect(() => { // 처음 페이지 로드 될 때 사용자의 음악 가져오기
        axios.post("http://localhost:3001/mySongList", {
            id : id,
        }).then((res) => {
            console.log(res);
            SetMyList(res.data);
        });
    }, []);

    function onClickDelBtn(name, artist) { // 삭제 버튼을 눌렀을 때
        console.log(name, artist);

        axios.post("http://localhost:3001/delSong", { // addSong 서버 api 호출
            id : window.sessionStorage.id, // 현재 세션에 있는 id (로그인한 id)
            name : name, // 노래명
            artist : artist, // 가수명
        }).then((res) => { // 서버에서 res 가져옴
            console.log("delSong => ", res);

            if(res.data.affectedRows === 1) { // 잘 됐으면
                alert(name + " 제거했습니다.");
                axios.post("http://localhost:3001/mySongList", { // db에 사용자가 저장한 음악 다시 가져오자
                    id : id,
                }).then((res) => {
                    console.log(res);
                    SetMyList(res.data);
                });
            } else { // 잘 안 됐으면 ㅠㅠ
               alert("오류!!") 
            };
        }).catch((e) => {
            console.error(e)
        });
    };

    return(
        <div>
            <Menu/>
            <div>
                <h2>나의 노래 목록</h2>
            </div>
            <div>
                {myList.length == 0 ? (<div><h3>노래를 추가해주세요~</h3></div>) : 
                (<div>
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
                                    <td><button onClick={() => onClickDelBtn(item.name, item.artist)}>제거</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>)}
            </div>
        </div>
    )
}

export default MyInfo;