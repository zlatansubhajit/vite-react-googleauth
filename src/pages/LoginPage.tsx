import { useContext } from 'react'
import { GoogleLogin,googleLogout } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import { VStack } from '@chakra-ui/react'
import viteLogo from '/vite.svg'
import { userContext } from '../App'
import { Link, useNavigate } from 'react-router-dom'


function LoginPage(){
    const  {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
      googleLogout();
        setUser(null);
        window.location.reload;
    }
    return(
        <>
        
        {!user && <VStack>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
          </div>
          <h1>Login to manage your gym!</h1>
      </VStack>}
      <VStack> 
        <Link to={"/about"} >Go to about page</Link>

        
        {!user &&
      
          <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            let x = null;
            if(jwtDecode(credentialResponse.credential?? "")!= "")
              x=jwtDecode(credentialResponse.credential?? "");
              console.log(x);
              setUser(x);
              navigate("/home")
          }}
          onError={() => console.log("Login failed!")}
          useOneTap
          />
       
        }
        
      </VStack> 

    </>
    )
}

export default LoginPage;