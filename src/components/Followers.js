import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/followModal.css'
import "../css/delbtn.css";

function Followers(props) {
    const [followerList, setFollowerList] = useState(props.followerList);

    console.log(followerList);
    
    return(
        <div>
            <div>
                <div className="headerTitle">
                    <h2>팔로워</h2>
                </div>
                <hr/>
                <div>
                    <table className="followTable">
                        <thead></thead>
                        <tbody>
                        {followerList.map((item, idx) => {
                            return(
                                <tr key={idx}>
                                    <td className="userID">
                                        <Link to={`/UserInfo/${item.from_user}`}>
                                            {item.from_user}
                                            <br/>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td><button className="delBtn">삭제</button></td>
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

export default Followers;