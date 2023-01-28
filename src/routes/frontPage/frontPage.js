import React, { useEffect, useState, useRef } from "react";
import camo from "../../images/camoflauge.png";
import './frontPage.css';
import Section from "./section";
import Card from "../card/card";
import { useOnScreen } from "../../useOnScreen";




/* <div className="bg">
            <div classname="fp">
                <h1 className="fpTitle">AI Arthouse Alpha</h1>
                <p>How to use:
                    <ul>
                        <li>Create an account.</li>
                        <li>Click on the "Generate" link.</li>
                        <li style={{color: "red"}}>Be patient, we only have two GPUs. Your images will load in automatically.</li>
                        <li style={{color: "red"}}>Working hours are between 7 A.M. EST and Midnight, but the backend is cheap and might shut down any time. Queued images will be done eventually.</li>
                        <li>Click on the image card to expand.</li>
                        <li>Your images are saved in the "My Images" tab, search is coming soon.</li>
                        <li>Back up the good stuff, this all might be purged.</li>
                    </ul>
                </p>
            </div>
        </div> */

export default function FrontPage() {

    const boxOne = useRef(null);
    const boxTwo = useRef(null);
    const boxOneVisible = useOnScreen(boxOne);
    const boxTwoVisible = useOnScreen(boxTwo);
    const [imagesOne, setImagesOne] = useState([]);
    const [imagesTwo, setImagesTwo] = useState([]);
    const [boxImage, setBoxImage] = useState(0);

    useEffect(() => {
        fetch("https://us-central1-aiarthouse.cloudfunctions.net/app/allImages")
            .then(res => res.json())
            .then(data => {
                setImagesOne(data);
                const interval = setInterval(() => {
                    setBoxImage((prev) => prev + 1);

                }, 3000);
                return () => clearInterval(interval);
            }).then(() => {
                fetch("https://us-central1-aiarthouse.cloudfunctions.net/app/allImages")
                    .then(res => res.json())
                    .then(data => {
                        setImagesTwo(data);
                    })
            })

    }, []);

    useEffect(() => {
        const newImageOne = document.getElementById("firstBox" + (boxImage % 30).toString());
        const newImageTwo = document.getElementById("secondBox" + (boxImage % 30).toString());
        if (newImageOne && newImageTwo) {
            
            if (boxOneVisible) {
                newImageOne.scrollIntoView({ behavior: "smooth", block: "center"});
            }
            if (boxTwoVisible == true) {
                console.log("NewImageTwo is " + boxTwoVisible +"but it still scrolls")
                newImageTwo.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [boxImage]);

    return (

        <div className="bg">
            <div className="fp">
                <div className="fpDivider">

                    <div className="fpTextBox">
                        <h2>Getting started:</h2>
                        <ul>
                            <li>Create an account.</li>
                            <li>Click on the "Generate" link.</li>
                            <li>Be patient, it may take a few minutes for the cloud GPU to warm up.</li>
                            <li>Click on the image card to expand.</li>
                            <li>Your images are saved in the "My Images" tab, search is coming soon.</li>
                            <li>Back up the good stuff, this all might be purged one day.</li>
                        </ul>
                    </div>

                    <div className="fpCarousel" id="boxOne" ref={boxOne}>
                        {imagesOne && imagesOne.map((i, index) => {
                            return (<div key={index} id={"firstBox" + (index % 30).toString()}>
                                <Card data={i} />
                            </div>)
                        })}
                        {imagesOne.length === 0 && <Card data={{}} />}

                    </div>

                    <div className="fpCarousel" id="boxTwo" ref={boxTwo}>
                        {imagesTwo && imagesTwo.map((i, index) => {
                            return (<div key={index} id={"secondBox" + (index % 30).toString()}>
                                <Card data={i} />
                            </div>)
                        })}
                        {imagesOne.length === 0 && <Card data={{}} />}

                    </div>

                    <div className="fpTextBox">
                        <h2>About the author</h2>
                        <img src={camo} className="profileImage" />
                    </div>
                </div>
            </div>
        </div>

    )
}