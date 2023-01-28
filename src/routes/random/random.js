import React from "react";
import "./random.css";
import Card from "../card/card.js"
import useImageSearch from "../../useImageSearch";
import { useState, useRef, useCallback, useEffect } from "react";




//https://us-central1-aiarthouse.cloudfunctions.net/app/allImages
//http://localhost:5001/aiarthouse/us-central1/app/allImages
export default function Random() {
    const [query, setQuery] = useState('');
    const [lastId, setLastId] = useState("");

    const {
        images,
        hasMore,
        loading
    } = useImageSearch(query, lastId, 'https://us-central1-aiarthouse.cloudfunctions.net/app/allImages');


    const observer = useRef();
    const lastImageRef = useCallback(card => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {

                setLastId(entries[0].target.getAttribute('id'));
            }
        })
        if (card) observer.current.observe(card)
    }, [loading, hasMore]);

    // function handleSearch(e) {
    //     setQuery(e.target.value);
    //     setLastId(1);
    // }


    //If you want to add a thing to the start of the box
    // {[..."<div>a thing</div>", images.map((i, index) => {
    //     if (images.length === index + 1) {
    //         return <div ref={lastImageRef} key={i.id} id={i.id}><Card data={i} /></div>
    //     }
        
    //     return <Card data={i} key={i.id} />
    // })]}

    //this fires it the first time
    useEffect(() => setQuery(""), [])
    //<input type="text" placeholder="Search" onChange={handleSearch}></input>
    return (
        <div>
            
            
            <div className="bg">


                <div className="gallery">
                        
                    {images.map((i, index) => {
                        if (images.length === index + 1) {
                            return <div ref={lastImageRef} key={i.id} id={i.id}><Card data={i} /></div>
                        }
                        
                        return <Card data={i} key={i.id} />
                    })}
                </div>
                {loading && <h1>Loading...</h1>}




            </div>
        </div>)
}