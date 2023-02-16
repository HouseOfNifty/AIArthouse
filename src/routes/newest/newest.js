import React from "react";
import "./newest.css";
import Card from "../card/card.js"
import useImageSearch from "../../useImageSearch";
import { useState, useEffect, useRef, useCallback } from "react";





export default function Newest() {
    const [query, setQuery] = useState('');
    const [lastId, setLastId] = useState("");

    //https://us-central1-aiarthouse.cloudfunctions.net/app/newest
    //http://localhost:5001/aiarthouse/us-central1/app/newest
    const {
        images,
        hasMore,
        loading
    } = useImageSearch(query, lastId, 'https://us-central1-aiarthouse.cloudfunctions.net/app/newest');


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
    
    
    useEffect(() => setQuery(""), [])
    //<input type="text" placeholder="Search" onChange={handleSearch}></input>

    return (
        
            <div className="bg">
            
                
                    <div className="gallery">

                        {images.map((i, index) => {
                            //TODO: add an 'in progress' image to the user version
                            if(i.imgSrc !== ""){
                                
                                if (images.length === index + 1) {
                                    console.log(i.timeStamp);
                                    return <div ref={lastImageRef} timestamp={i.timeStamp} key={i.id} id={i.id}><Card data={i} /></div>
                                }
                                return <Card data={i} key={i.id}/>

                            }
                            return null;

                        })}
                    </div>
                    {loading && <h1>Loading...</h1>}
                



            </div>
        )
}