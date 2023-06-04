import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/followModal.css'
import FollowBtn from "./FollowBtn";

interface FollowingsProps {
    followList: [];
    fromID: string;
}

type FollowList = {to_user: string, toID: string, name: string};

function Followings(props: FollowingsProps) {
    
    const [followList, setFollowList] = useState<FollowList[]>([]);

    useEffect(() => {
        setFollowList(props.followList);
    }, [props.followList]);

    console.log(followList);
    const id = props.fromID;

    console.log("id", props.fromID);

    return(
        <div>
            <div>
                <div className="headerTitle">
                    <h2>팔로잉</h2>
                </div>
                <hr/>
                <div>
                    <table className="followTable">
                        <thead></thead>
                        <tbody>
                        {followList.map((item, idx) => {
                            return(
                                <tr key={idx}>
                                    <td className="userID">
                                        <Link to={`/UserInfo/${item.to_user}`}>
                                            {item.to_user}
                                            <br/>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <FollowBtn toID = {item.to_user} fromID = {id}></FollowBtn>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Followings;