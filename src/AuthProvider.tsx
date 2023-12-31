import { createContext,useState } from "react";

const AuthContext = createContext<any>({})
export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [auth, setAuth] = useState({})

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext