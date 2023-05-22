import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/likeBtn.css";
import like from '../img/like.png';
import unlike from '../img/unlike.png';

function LikeBtn({ songTitle, songArtist, userID }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // 노래의 좋아요 정보를 가져오는 함수
        getLikeInfo();

        // 유저가 노래 좋아요 눌렀는지 확인
        chkLike();
    }, []);

    function chkLike() {
        axios.post("http://localhost:3001/likes/isLike", {
            songTitle : songTitle,
            songArtist : songArtist,
            userID : userID,
        }).then((res) => {
            if(res.data.length === 0) {
                setLiked(false);
            } else {
                setLiked(true);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    const getLikeInfo = async () => {
        try {
            await axios.post("http://localhost:3001/likes/count", {
                songTitle : songTitle,
                songArtist : songArtist,
            }).then((res) => {
                console.log(res.data[0]['count']);
                setLikeCount(res.data[0]['count']);
            });
        } catch (error) {
            console.error("Error fetching like information:", error);
        }
    };

    const onClickLikeBtn = () => {
        // 좋아요 버튼 클릭 시 서버로 좋아요 요청을 보냄
        if(!liked) {
            axios.post("http://localhost:3001/likes/like", {
                songTitle : songTitle,
                songArtist : songArtist,
                userID : userID,
            }).then((res) => {
                console.log(res);
            });
            // 좋아요 요청이 성공하면 버튼 상태 변경
            setLiked(true);
            setLikeCount((prevCount) => prevCount + 1);
        } else {
            axios.post("http://localhost:3001/likes/unLike", {
                songTitle : songTitle,
                songArtist : songArtist,
                userID : userID,
            });
            // 좋아요 취소 요청이 성공하면 버튼 상태 변경
            setLiked(false);
            setLikeCount((prevCount) => prevCount - 1);
        }
    };

    return (
    <div>
        <button className={liked ? "unlikeBtn" : "likeBtn"}  onClick={() => onClickLikeBtn()}>
            {liked ? <span>♥</span> : <span>♡</span>} {likeCount}
        </button>
        
    </div>
    );
    }

export default LikeBtn;