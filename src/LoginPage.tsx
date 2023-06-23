import { useContext, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider,googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import viteLogo from '/vite.svg'
import { userContext } from './App';
import { Link } from 'react-router-dom';


function LoginPage(){
    const  {user, setUser} = useContext(userContext);
    const handleLogOut = () => {
      googleLogout();
        setUser(null);
        window.location.reload;
    }
    return(
        <>
        {!user && <div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
          </div>
          <h1>Login to manage your gym!</h1>
      </div>}
        
      <Link to={"/about"} >Go to about page</Link>

      <GoogleOAuthProvider clientId='17469560107-vh52b7titgb2uoef1b84ngp4q8d5d7cv.apps.googleusercontent.com'>
      {!user &&
        <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          let x = null;
          if(jwtDecode(credentialResponse.credential?? "")!= "")
            x=jwtDecode(credentialResponse.credential?? "");
            console.log(x);
            setUser(x);
            
        }}
        onError={() => console.log("Login failed!")}
        useOneTap
        />
      }
      {user &&
        <div>
          <h2>You are logged in as {user.email}</h2>
          <img src={user.picture} alt="profile picture" />
          <button onClick={handleLogOut}>Logout</button>
        </div>
      }
      </GoogleOAuthProvider>
    </>
    )
}

export default LoginPage;