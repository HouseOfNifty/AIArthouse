import React, { useEffect, useRef, useState, useCallback } from "react";
import './userPage.css';
import { auth, db } from "../../firebase";
import { useParams } from "react-router-dom";
import Card from "../card/card";
import useUserSearch from "../../useUserSearch";

export default function UserPage() {


    const user = auth.currentUser;

    if(!user) {
        return <div className="bg"> <h1>Not signed in</h1></div>
    }
    //send the current user ID and the username and check if they match on the server

    //gallery code


    const [lastId, setLastId] = useState("");

    const {
        images,
        hasMore,
        loading
    } = useUserSearch(user.uid, lastId, 'https://us-central1-aiarthouse.cloudfunctions.net/app/userImages');


    const observer = useRef();
    const lastImageRef = useCallback(card => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {

                setLastId(entries[0].target.getAttribute('timestamp'));
            }
        })
        if (card) observer.current.observe(card)
    }, [loading, hasMore]);

    


    return (<div className="bg">
        <div name="Info Header">
            <img src="" alt="Avatar" />
            <h1></h1>
        </div>
        <div name="gallery">

        </div>
        <div name="settings page">

        </div>
        {user ? 
        <div className="gallery">
            {images.map((i, index) => {
                if (images.length === index + 1) {
                    return <div ref={lastImageRef} timestamp={i.timeStamp} key={i.id} id={i.id}><Card data={i} /></div>
                }

                return <Card data={i} key={i.id} />
            })}
        </div>
        : <div>Not signed in</div>}
    </div>)
}