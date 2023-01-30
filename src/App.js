import React from "react";
import './App.css';
import logo from "./images/logo.png"


import { Link, Outlet } from "react-router-dom";
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from 'react';




function App() {

  const [currUser, setCurrUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user);
    } else {
      setCurrUser(null);
    }
  })
  return (
    <div className="defaultBackground">
      <div className="App">
        <Link to='/'><img className='App-logo' src={logo} alt="Logo" /></Link>
        <div className="navStack">

          <h1 className='headerTitle' >AI Arthouse</h1>
          <nav className="topNavBar">

            <Link className='link' to="/random">Random</Link>
            <Link className='link' to="/newest">Newest</Link>
            {!currUser ? <Link className='link' to="/login">Generate</Link> : null}
            {!currUser ?
              <>
                <Link className='link' to='/login'>Log In</Link>
                <Link className='link' to='/signup'>Sign Up</Link>
              </> :
              <>
                <Link className='link' to="/generate">Generate</Link>
                <Link className='link' to="/user">My Images</Link>
                <Link to='/login' className="link" onClick={() => signOut(auth)}>Log out</Link>
              </>}
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
