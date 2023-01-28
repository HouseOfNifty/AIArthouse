import React from "react";
import '../signup/signup.css';

import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";





export default function LogIn() {

    const navigate = useNavigate();

    const logIn = async (event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, event.target.email.value, event.target.password.value);
        }
        catch(e){
            console.log(e);
        }
        navigate("/");
    }

    return (<div className='bg-signup'>
        <h1>Log In</h1>
        
        <form className="fg" onSubmit={logIn}>
            <h3>Email</h3>
            <input type='text' id='email' name='email'/>
            <h3>Password</h3>
            <input type='password' id='password' name='password'/>

            <div></div>
            <input className='button' type='submit' value='Log in' />
            </form>
        
    </div>)
}