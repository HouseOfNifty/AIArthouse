import React from 'react';
import "./signup.css"


import { useNavigate } from 'react-router-dom';


import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';








export default function SignUp() {

    const navigate = useNavigate();

    const signUp = async (event) => {

        event.preventDefault();
        createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value).then((user) => { 
            axios({
                method: 'POST',
                url: "https://us-central1-aiarthouse.cloudfunctions.net/app/newUser",
                params: { id: user.user.uid,
                            userName: event.target.userName.value },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
                
            }).then(navigate('/'));
            
        
    })

}


return (<div className='bg-signup'>
    <h1>Sign Up</h1>

    <form className='fg' onSubmit={signUp}>
        <div><h3>Email</h3></div>
        <input type='text' id='email' name='email' />


        <div><h3>Password</h3></div>
        <input type='password' id='password' name='password' />

        <div><h3>Username</h3></div>
        <input type='text' id='userName' name='userName' />

        <div></div>
        <input className='button' type='submit' value='Submit' />
    </form>


</div>)
}