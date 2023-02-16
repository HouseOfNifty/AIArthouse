import React, { useState } from 'react';

import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./generate.css"
import GeneratedCard from './GeneratedCard';
import PromptBox from './promptBox';


export default function Generate() {

    

    
    const [showImages, setShowImages] = useState(false);
    const [imageIDs, setImageIDs] = useState([]);
    const [currUser, setCurrUser] = useState(null);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrUser(user);
        } else {
            setCurrUser(null);
        }
    })

    //add the UID to the end of the image SRC so youre not overwriting shit


    

    //{imageIDs.map((i) => <GeneratedCard id={i}/>)}

    //TODO: chop out the input box and put it in its own component so it doesnt try and rerender everything when theres stuff in the boxes
    return (<div className='bg-generate'>
        <div className={showImages ? "fg-generate" : "fg-generate-hidden"}>

            {imageIDs.map((i, index) => <GeneratedCard id={i} key={index} />)}

        </div>
        
            
        <PromptBox setImageIDs={setImageIDs} setShowImages={setShowImages} currUser={currUser}/>

    </div>)
}