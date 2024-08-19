import "./Header.css";
import { NavLink } from 'react-router-dom';
import { BrowserUpdated } from "@mui/icons-material";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";

function Header(): JSX.Element {
    return (
        <div>
            <nav className="Header">
                <div className="logo">
                    <NavLink to="/" className="logoLink">
                        <span className="logoLargeScreen">
                            <BrowserUpdated sx={AppComponentsStyle.headerLargeLogo} /> <span className="logoNameLargeScreen">Effortless Metadata Fetching</span>
                        </span>
                        <span className="logoSmallScreen">
                            <BrowserUpdated sx={AppComponentsStyle.headerSmallLogo} /> <span className="logoNameSmallScreen">Effortless Metadata Fetching</span>
                        </span>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Header;
