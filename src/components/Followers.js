import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/followModal.css'

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
                        {followerList.map((item, idx) => {
                            return(
                                <tr>
                                    <td className="userID" key={idx}>
                                        <Link to={`/UserInfo/${item.from_user}`}>
                                            {item.from_user}
                                            <br/>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className="delBtn"><button>삭제</button></td>
                                </tr>
                            )
                        })}
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default Followers;