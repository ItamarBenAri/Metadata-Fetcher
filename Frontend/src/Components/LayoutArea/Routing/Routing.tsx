import { Navigate, Route, Routes } from "react-router-dom";
import Page404 from "../Page404/Page404";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* App Routes */}
                <Route path="/home" element={<Home />} />

                {/* Default Route: */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found routes: */}
                <Route path="*" element={<Page404 />} />

            </Routes>

        </div>
    );
}

export default Routing;