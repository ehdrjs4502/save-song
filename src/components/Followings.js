import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/followModal.css'
import FollowBtn from "./FollowBtn";

function Followings(props) {
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        setFollowList(props.followList);
    }, [props.followList]);

    console.log(followList);

    const id = props.fromId;

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
                                        <FollowBtn toId = {item.to_user} fromId = {id}></FollowBtn>
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