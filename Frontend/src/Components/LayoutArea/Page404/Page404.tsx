import useTitle from "../../../Utils/UseTitle";
import imageSource from "../../../Assets/Images/404.gif";
import "./Page404.css";

function Page404(): JSX.Element {

    // Set title to the page
    useTitle("404 | Page Not Found");
    
    return (
        <div className="page404">
            <img src={imageSource} alt="404 page not found" />
        </div>
    );
}

export default Page404;
