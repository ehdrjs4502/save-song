import { Link } from "react-router-dom";

function Menu() {
    
    return(
        <div>
            <div>
                <ul>
                    <li><Link to="/Main">Top 100</Link></li>
                    <li><Link to="/Search">노래 검색</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;