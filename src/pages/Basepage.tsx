import { Link } from "react-router-dom";

export default function BasePage() {
    return(
        <>
            <div>Base Page</div>
            <Link to={'/home'}>Please Login with google to use app</Link>
        </>
    )
}