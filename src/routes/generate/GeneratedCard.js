import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
//import bingus from "../../images/bingus.jpg";
//import like from "../../images/like.png";
import "../card/card.css";
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import axios from "axios";

export default function GeneratedCard(props) {

    const [flipped, setFlipped] = useState(false);
    const [imageDoc, setDoc] = useState({ "title": "", "imgSrc": "", "prompt": "" })
    const [liked, setLiked] = useState(false);

    


    async function handleClick(){
        setFlipped((oldFlipped) => !oldFlipped);
    }

    async function handleDoubleClick(){
        //setShowLike(true)
        if(!liked){

            axios({method: 'GET',
            url: 'https://us-central1-aiarthouse.cloudfunctions.net/app/like',
            params: { id: imageDoc.id}})
            //setTimeout(setShowLike(false), 2000)
            setLiked(true);
            
        }
    }

    //add some sort of popup here
    async function handleDelete(){
        axios({method: 'GET',
        url: 'https://us-central1-aiarthouse.cloudfunctions.net/app/report',
        params: { id: imageDoc.id}})
    }

    useEffect(
        () => {
            const docReference = query(collection(db, 'images'), where('id', '==', props.id));
            const unsubscribe = onSnapshot(docReference, 
                (snapshot) => snapshot.docChanges().forEach((change) => {
                setDoc({...change.doc.data()});
                
            }
            ))
            return () => unsubscribe();
            }, [props])

            //        

            return (<div>
            
                {!flipped ? <div className="frontcard show" onClick={handleClick}>
                    {imageDoc.imgSrc ? <img className="imgSmall" alt="Art" loading="lazy" src={"https://aiartbucket.s3.amazonaws.com/" + imageDoc.imgSrc}/> 
                    : <div className="loaderBox"><div className="loader"></div></div>}
                    
                    <p className="title">{imageDoc.prompt}</p>
                    
                </div> :
                <div className="backcard show">
                    {imageDoc.imgSrc ? <img className="imgLarge" alt="Art" loading="lazy" src={"https://aiartbucket.s3.amazonaws.com/" + imageDoc.imgSrc} onDoubleClick={handleDoubleClick}/> 
                    : <div className="loaderBox"><div className="loader"></div></div>}
                    
                    <p>{imageDoc.prompt}</p>
                    
                    <p onClick={handleDelete}>Delete</p>
                    <img className="exitButton" alt="exit" src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png" onClick={handleClick}/>
                    
                </div>}
    
                
                
            
            </div>)
        }

        //11:30 friday