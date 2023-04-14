import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';

function FollowBtn(props) {
    const [isFollowing, setIsFollowing] = useState(false);
    const toId = props.toId; // 팔로우할 아이디
    const fromId = props.fromId; // 내 아이디

    console.log(toId, fromId);

    function chkFollow() {
        axios.post("http://localhost:3001/follow/isFollow", {
            fromUser : fromId,
            toUser : toId,
        }).then((res) => {
            console.log(res.data);
            if(res.data.length === 0) {
                setIsFollowing(false);
            } else {
                setIsFollowing(true);
            }
        }).catch((err) => {
            console.error(err);
        });
    }
    
    useEffect(() => {
        chkFollow();
    }, [toId, fromId]);

    console.log(isFollowing);

    function onClickFollowBtn() {
        if(isFollowing) { // 팔로우 돼있으면 언팔로우
            axios.post("http://localhost:3001/follow/unFollow", {
                fromUser : fromId,
                toUser : toId,
            }).then((res) => { // 서버에서 res 가져옴
                if(res.data.affectedRows === 1) { // 잘 됐으면
                    chkFollow();
                } else { // 잘 안 됐으면 ㅠㅠ
                alert("오류!!") 
                };
            });

        } else { // 팔로우 안돼있으면 팔로우
            axios.post("http://localhost:3001/follow/follow", {
                fromUser : fromId,
                toUser : toId,
            }).then((res) => {
                console.log("follow => ", res);
    
                if(res.data.affectedRows === 1) { // 잘 됐으면
                    chkFollow();
                } else { // 잘 안 됐으면 ㅠㅠ
                   alert("오류!!") 
                }
            });
        }
    }

    return(
        <button onClick={() => onClickFollowBtn(toId)}>{isFollowing ? "언팔로우" : "팔로우"}</button>
    )
};

export default FollowBtn;