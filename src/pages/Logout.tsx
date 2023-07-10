import { useContext } from "react";
import AuthContext from "../AuthProvider";
import { useNavigate } from "react-router";
import { googleLogout } from "@react-oauth/google";

function Logout() {
    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        googleLogout()
        setAuth({})
        navigate('/')
    }
    return handleLogOut
}

export default Logout