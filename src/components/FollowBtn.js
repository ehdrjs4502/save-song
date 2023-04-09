import axios from 'axios';
import React from 'react';

function FollowBtn(props) {
    function onClickFollowBtn(toId) {
        axios.post("http://localhost:3001/follow", {
            fromUser : props.fromId,
            toUser : toId,
        }).then((res) => {
            console.log("follow => ", res);

            if(res.data.affectedRows === 1) { // 잘 됐으면
                alert(toId + " 추가했습니다.");
            } else { // 잘 안 됐으면 ㅠㅠ
               alert("오류!!") 
            }
        })
    }
    return(
        <button onClick={() => onClickFollowBtn(props.toId)}>추가</button>
    )


};

export default FollowBtn;