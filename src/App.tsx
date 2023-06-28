import React, { createContext, useContext, useState } from 'react';
import {Routes, Route, Link, Outlet } from 'react-router-dom';
import './App.css'
import Protected from './utils/protected';
import LoginPage from './pages/LoginPage';
//import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import { HomePage } from './pages/HomePage';
//import { ManageMembers } from './pages/ManageMembers';

export const userContext = createContext<any>(null);
function App() {
  const [user, setUser] = useState<any>(null);
  //const HomePage = React.lazy(() => import("./pages/HomePage"))
  const AboutPage = React.lazy(() => import("./pages/AboutPage").then(({default: AboutPage}) => ({default: AboutPage})));
  const ManageMembers = React.lazy(() => import("./pages/ManageMembers").then(({default: ManageMembers}) => ({default: ManageMembers})));

 const isLoggedIn = (loginData:any) => {
    console.log(loginData);
    console.log(!!loginData);
    return !!loginData;
  }

  return (
    <>
    <userContext.Provider value={{user, setUser}}>
    <Navbar/>
    <Routes>
      <Route
        path='/'
        element={
          <React.Suspense fallback={<>...</>}>
            <LoginPage />
          </React.Suspense>
        }
      ></Route>
      <Route path="/about" element={
         <React.Suspense fallback={<>...</>}>
        <Protected isSignedIn={isLoggedIn(user?.email)}>
        <AboutPage />
        </Protected>
        </React.Suspense>
        }
      ></Route>
      <Route path="/home" element={
         <React.Suspense fallback={<>...</>}>
        <Protected isSignedIn={isLoggedIn(user?.email)}>
        <HomePage />
        </Protected>
        </React.Suspense>
        }
      ></Route>
      <Route path="/member" element={
         <React.Suspense fallback={<>...</>}>
        <Protected isSignedIn={isLoggedIn(user?.email)}>
        <ManageMembers />
        </Protected>
        </React.Suspense>
        }
      ></Route>
      <Route path="*" element={<div>Hey</div>} ></Route>
    </Routes>
    </userContext.Provider>

    </>
  )
}

export default App
