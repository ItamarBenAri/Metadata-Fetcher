import { useSelector } from "react-redux";
import useTitle from "../../../Utils/UseTitle";
import { FetchDataForm } from "../../FetchDataArea/FetchDataForm/FetchDataForm";
import { FetchDataResult } from "../../FetchDataArea/FetchDataResult/FetchDataResult";
import "./Home.css";
import { AppState } from "../../../Redux/AppState";
import MetadataModel from "../../../Models/MetadataModel";
import { useEffect } from "react";
import { csrfTokenService } from "../../../Services/CsrfTokenService";

function Home(): JSX.Element {
    useTitle("FetchMeta | Home");
    const metadata = useSelector<AppState, MetadataModel[]>(appState => appState.metadata);

    useEffect(() => {
        csrfTokenService.storeCsrfTokenInCookie();        
    }, []);

    return (
        <div className="Home">
            <FetchDataForm />
            {metadata.length > 0 && <FetchDataResult />}
        </div>
    );
}

export default Home;
