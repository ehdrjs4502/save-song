import AgeGroupTop from "./AgeGroupTop";
import Menu from "./Menu";
import PopularChart from "./PopularChart";

function Main() {
    
    return(
        <div>
            <div><Menu/></div>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <div></div>
                <PopularChart/>
                <AgeGroupTop/>
            </div>
            <div></div>
        </div>
    )
}

export default Main;