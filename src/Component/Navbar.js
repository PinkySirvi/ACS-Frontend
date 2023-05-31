import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState } from "react";
import { faCog, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AnemoiLogo from './Images/AnemoiLogo1.jpg';

function Navbar() {
    const [searchResults, setSearchResult] = useState([])

    return (
        <div>

            <nav className="nav">
                <img src={AnemoiLogo} height={35} width={35} style={{ marginTop: "9px" }} />
                <input type="text" placeholder="        Search Here  " onClick={() => setSearchResult()}
                    style={{ height: "35px", width: "150px", marginTop: "10px", marginLeft: "550px", borderRadius: "20px", color: "black" }} />

                <Link to="/Logs"><button name="Logs" style={{ color: "black", marginTop: "15px" }}>Logs</button></Link>
                <Link to="/Announcement"><FontAwesomeIcon icon={faVolumeUp} style={{ color: "black", fontSize: "25px" , marginTop: "15px"  }} /></Link>
                <Link to="/Notifications"><FontAwesomeIcon icon={faBell} style={{ color: "black", fontSize: "25px", marginTop: "15px" }} /></Link>
                <Link to="/Settings"><FontAwesomeIcon icon={faCog} style={{ color: " black", fontSize: "25px", marginTop: "15px" }} /></Link>

            </nav>

        </div>
    )
}
export default Navbar;
