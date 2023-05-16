import React, { useState, useEffect } from "react";
import axios from "axios";

function LikeBtn({ songTitle, songArtist, userID }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // 노래의 좋아요 정보를 가져오는 함수
        getLikeInfo();
    }, []);

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

    const handleLike = async () => {
        try {
            // 좋아요 버튼 클릭 시 서버로 좋아요 요청을 보냄
            await axios.post("http://localhost:3001/likes/like", {
            songTitle : songTitle,
            songArtist : songArtist,
            userID : userID,
        }).then((res) => {
            console.log(res);
        });
        // 좋아요 요청이 성공하면 버튼 상태 변경
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        } catch (error) {
            console.error("Error liking the song:", error);
        }
    };

    const handleUnlike = async () => {
        try {
        // 좋아요 취소 버튼 클릭 시 서버로 좋아요 취소 요청을 보냄
        await axios.delete("http://localhost:3001/likes/unlike", {
            songTitle : songTitle,
            songArtist : songArtist,
            userID : userID,
        });
        // 좋아요 취소 요청이 성공하면 버튼 상태 변경
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        } catch (error) {
            console.error("Error unliking the song:", error);
        }
    };

    return (
    <div>
        <button onClick={liked ? handleUnlike : handleLike}>
            {liked ? "Unlike" : "Like"}
        </button>
        <span>{likeCount}</span>
    </div>
    );
    }

export default LikeBtn;