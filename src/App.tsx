import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import Layout from './pages/LayoutPage';
import BasePage from './pages/Basepage';
import RequireAuth from './RequireAuth';
//import AboutPage from './pages/AboutPage';

function App() {
  const AboutPage = React.lazy(() => import("./pages/AboutPage").then(({default: AboutPage}) => ({default: AboutPage})));
  const ManageMembers = React.lazy(() => import("./pages/ManageMembers").then(({default: ManageMembers}) => ({default: ManageMembers})));

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* Private Routes */}
        <Route element={<RequireAuth/>}>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/members' element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ManageMembers />
          </React.Suspense>
        }/>
        <Route path='/about' element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </React.Suspense>
        }/>
        </Route>

        {/* Public Routes */}
        <Route path='/' element={<BasePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        
      </Route>
    </Routes>
    </>
  )
}

export default App
