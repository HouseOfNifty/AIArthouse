import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Newest from './routes/newest/newest';
import Random from './routes/random/random';
import LogIn from './routes/login/login';
import Upload from './routes/upload/upload';
import SignUp from './routes/signup/signup'
//import Image from './routes/image/image';
import FrontPage from './routes/frontPage/frontPage';
import Generate from './routes/generate/generate';
import UserPage from './routes/userPage/userPage';
import GiveMeAJob from './routes/giveMeAJob/giveMeAJob';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Router style={{height: "100%", display: "flex"}}>
    
    
    <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LogIn/>}/>
          <Route path="newest" element={<Newest/>}/>
          <Route path="random" element={<Random/>}/>
          <Route path="upload" element={<Upload/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="user" element={<UserPage/>}/>
          <Route path="home" element={<FrontPage/>}/>
          <Route path="generate" element={<Generate/>}/>
          <Route path="user/:id" element={<UserPage/>}/>
          <Route path="giveMeAJob" element={<GiveMeAJob/>}/>
          <Route index element={<FrontPage/>}/>
        </Route>
    </Routes>
    
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
