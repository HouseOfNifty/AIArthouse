import React from "react";
import { useState, useRef } from "react";
import "./card.css";
import bingus from "../../images/bingus.jpg";
import like from "../../images/like.png";
import axios from "axios";
import { useOnScreen } from "../../useOnScreen";
//import onClickOutside from "react-onclickoutside";

export default function Card(props){

    const body = useRef(null);
    const visible = useOnScreen(body);
    const [flipped, setFlipped] = useState(false);
    //const [showLike, setShowLike] = useState(false);
    const [liked, setLiked] = useState(false);

    const [likes, setLikes] = useState(props.data.likes);

    function handleClick(){
        setFlipped(oldFlipped => !oldFlipped);
    }

    async function handleDoubleClick(){
        //setShowLike(true)
        if(!liked){

            axios({method: 'GET',
            url: 'https://us-central1-aiarthouse.cloudfunctions.net/app/like',
            params: { id: props.data.id}})
            //setTimeout(setShowLike(false), 2000)
            setLiked(true);
            setLikes(oldLikes => oldLikes + 1)
        }
    }


    //add some sort of popup here
    async function handleReport(){
        axios({method: 'GET',
        url: 'https://us-central1-aiarthouse.cloudfunctions.net/app/report',
        params: { id: props.data.id}})
    }

    

    return(
        //outside controls the width
        //<a href={"https://aiarthouse.web.app/user?id=" + props.data.owner}>{props.data.userName}</a>
        <div>
            
            {!flipped ? <div className={visible ? "frontcard show" : "frontcard hidden"} onClick={handleClick} ref={body}>
                <img className="imgSmall" alt="Art" loading="lazy" src={props.data.imgSrc ? "https://aiartbucket.s3.amazonaws.com/" + props.data.imgSrc : bingus}></img>
                <p className="title">{props.data.prompt}</p>
                
            </div> :
            <div className={visible ? "backcard show" : "backcard hidden"}>
                <img className="imgLarge" loading="lazy" alt="Art" src={props.data.imgSrc ? "https://aiartbucket.s3.amazonaws.com/" + props.data.imgSrc : bingus}
             onDoubleClick={handleDoubleClick}/>
                
                <p>{props.data.prompt}</p>
                <div style={{display: "flex", width: "50%", margin: "auto"}}>
                <p style={{margin: "auto"}}>{likes} <img alt="thumbs up" className={!liked ? "like" : "like liked"} src={like} onClick={handleDoubleClick}/></p>
                
                <p style={{margin: "auto"}} onClick={handleReport}>Report</p>
                </div>
                <img className="exitButton" alt="exit" src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png" onClick={handleClick}/>
                
            </div>}

            
            
        
        </div>

        
        
    )
}