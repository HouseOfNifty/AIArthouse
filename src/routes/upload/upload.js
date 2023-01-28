import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
export default function Upload() {

    const [currUser, setCurrUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrUser(user);
        } else {
            setCurrUser(null);
        }
    })

    const navigate = useNavigate();

    const uploadFile = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("title", event.target.title.value);
        formData.append("engine", event.target.engine.value);
        formData.append("tags", event.target.tags.value.split(","));
        formData.append("prompt", event.target.prompt.value);
        formData.append("image", event.target.image.files[0]);
        formData.append("owner", currUser.uid);
        

        axios.post("https://us-central1-aiarthouse.cloudfunctions.net/app/upload", formData, 
        {
            
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            
            navigate("/random");
        });

    }


    return (
        <div className='bg-signup'>
            <h1>Upload</h1>

            <form className='fg' onSubmit={uploadFile}>
                <div><h3>Title</h3></div>
                <input type='text' id='title' name='title' />


                <div><h3>Engine</h3></div>
                <input type='text' id='engine' name='engine' />

                <div><h3>Tags</h3> <h6>(separate with ,)</h6></div>
                <input type='text' id='tags' name='tags' />

                <div><h3>Prompt</h3></div>
                <input type='text' id='prompt' name='prompt' />

                <div><h3>File</h3></div>
                <input type='file' id='image' name='image' />

                <div></div>
                <input className='button' type='submit' value='Submit' />
            </form>


        </div>
    );
}