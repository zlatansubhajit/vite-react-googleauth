import React, { createContext, useContext, useState } from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Protected from './protected';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';

export const userContext = createContext<any>(null);
function App() {
  const [user, setUser] = useState<any>(null);
  //const HomePage = React.lazy(() => import("./HomePage"));
  //const AboutPage = React.lazy(() => import("./AboutPage"));

  const isLoggedIn = (loginData:any) => {
    console.log(loginData);
    console.log(!!loginData);
    return !!loginData;
  }

  return (
    <>
    <Routes>
      <Route
        index
        element={
          <React.Suspense fallback={<>...</>}>
            <userContext.Provider value={{user, setUser}}>
            <LoginPage />
            </userContext.Provider>
          </React.Suspense>
        }
      ></Route>
      <Route path="about" element={
         <React.Suspense fallback={<>...</>}>
        <Protected isSignedIn={isLoggedIn(user?.email)}>
        <AboutPage />
        </Protected>
        </React.Suspense>
        }
      ></Route>
      <Route path="*" element={<div>Hey</div>} ></Route>
    </Routes>
    </>
  )
}

export default App
