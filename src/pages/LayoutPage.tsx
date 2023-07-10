import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => {
    return(
        <main className="App">
            <Navbar/>
            <Outlet/>
        </main>
    )
}

export default Layout