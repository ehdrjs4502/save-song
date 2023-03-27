import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function DelBtn(props) {
    const navigate = useNavigate();
    function onClickDelBtn(name, artist) { // 추가 버튼을 눌렀을 때
        console.log(name, artist);

        axios.post("http://localhost:3001/delSong", { // addSong 서버 api 호출
            id : window.sessionStorage.id, // 현재 세션에 있는 id (로그인한 id)
            name : name, // 노래명
            artist : artist, // 가수명
        }).then((res) => { // 서버에서 res 가져옴
            console.log("delSong => ", res);

            if(res.data.affectedRows === 1) { // 잘 됐으면
                alert(name + "을 제거했습니다.");
            } else { // 잘 안 됐으면 ㅠㅠ
               alert("오류!!") 
            }
        }).catch((e) => {
            console.error(e)
        })
    }
    return(
        <button onClick={() => onClickDelBtn(props.name, props.artist)}>제거</button>
    )
}

export default DelBtn;
