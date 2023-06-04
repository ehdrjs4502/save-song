import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../css/follow-btn.css';

interface FollowBtnProps {
    toID: string;
    fromID: string;
}

function FollowBtn(props: FollowBtnProps) {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const { toID, fromID } = props;
    
    useEffect(() => {
        chkFollow();
    }, [toID, fromID]);

    function chkFollow() {
        console.log("fromID : ",fromID);
        axios.post("http://localhost:3001/follow/isFollow", {
            fromUser : fromID,
            toUser : toID,

        }).then((res) => {
            if(res.data.length === 0) {
                setIsFollowing(false);
            } else {
                setIsFollowing(true);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    function onClickFollowBtn() {
        if(isFollowing) { // 팔로우 돼있으면 언팔로우
            axios.post("http://localhost:3001/follow/unFollow", {
                fromUser : fromID,
                toUser : toID,
            }).then((res) => { // 서버에서 res 가져옴
                if(res.data.affectedRows === 1) { // 잘 됐으면
                    setIsFollowing(false);
                } else { // 잘 안 됐으면 ㅠㅠ
                alert("오류!!") 
                };
            });

        } else { // 팔로우 안돼있으면 팔로우
            axios.post("http://localhost:3001/follow/follow", {
                fromUser : fromID,
                toUser : toID,
            }).then((res) => {
                console.log("follow => ", res);
    
                if(res.data.affectedRows === 1) { // 잘 됐으면
                    setIsFollowing(true);
                } else { // 잘 안 됐으면 ㅠㅠ
                   alert("오류!!") 
                }
            });
        }
    }

    return(
        <button className={isFollowing ? "unfollow-btn" : "follow-btn"} onClick={() => onClickFollowBtn()}>{isFollowing ? "언팔로우" : "팔로우"}</button>
    )
};

export default FollowBtn;