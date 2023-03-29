import AgeGroupTop from "./AgeGroupTop";
import Menu from "./Menu";
import PopularChart from "./PopularChart";

function Main() {
    
    return(
        <div>
            <div><Menu/></div>
            <div>
                <PopularChart/>
            </div>
            <div><AgeGroupTop/></div>
        </div>
    )
}

export default Main;