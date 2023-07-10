import { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import { VStack } from '@chakra-ui/react'
import viteLogo from '/vite.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../AuthProvider';

function LoginPage(){
  const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    
    return(
        <>
        
        <VStack>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
          </div>
          <h1>Login to manage your gym!</h1>
       
          <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            let x = null;
            if(jwtDecode(credentialResponse.credential?? "")!= "")
              x=jwtDecode(credentialResponse.credential?? "");
              console.log(x);
              setAuth({user: x});
              navigate(from, {replace: true})
          }}
          onError={() => console.log("Login failed!")}
          useOneTap
          />
        
      </VStack> 

    </>
    )
}

export default LoginPage;