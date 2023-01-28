import React, { useState } from "react";
import "./image.css";
import like from '../../images/like.png';
import axios from "axios";



export default function Image(props){

    const [likes, setLikes] = useState(props.data.likes);

    async function handleDoubleClick(){
        //setShowLike(true)
        axios({method: 'GET',
        url: 'https://us-central1-aiarthouse.cloudfunctions.net/app/like',
        params: { id: props.data.id}})
        //setTimeout(setShowLike(false), 2000)
        setLikes(oldLikes => oldLikes + 1)
    }

    return(
        <div>
            <img className='imgLarge' alt={props.title} src={props.imgSrc}/>
            <p className="title">{props.data.title}</p>
            {props.data.title !== props.data.prompt && <p>Prompt: {props.data.prompt}</p>}
            <p>{likes} <img alt="thumbs up" className="like" src={like} onClick={handleDoubleClick}/></p>
        </div>
    )
}