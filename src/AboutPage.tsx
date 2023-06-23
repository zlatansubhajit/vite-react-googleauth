import { Link } from 'react-router-dom';
function AboutPage(){
    return(
        <div>
            <h1>Welcome to About Page</h1>
            <Link className="btn btn-primary"  to="/">Go Back Home</Link>
        </div>
    )
}

export default AboutPage;