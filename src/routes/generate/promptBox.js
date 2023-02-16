import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
export default function PromptBox(props) {

    const promptBox = useRef();
    const [steps, setSteps] = useState(50);
    const [scale, setScale] = useState(7);
    const [numImages, setNumImages] = useState(1);
    const [tokenCost, setTokenCost] = useState(0);
    const [advancedMode, setAdvancedMode] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [generatorStatus, setGeneratorStatus] = useState("Loading...");

    const handleStepsChange = async (e) => {
        setSteps(e.target.value);
    }

    const handleScaleChange = async (e) => {
        setScale(e.target.value);
    }

    const handleImagesChange = async (e) => {
        setNumImages(e.target.value);
    }

    const generateImage = async () => {
        //set the images and show them
        const formData = new FormData();
        formData.append("prompt", promptBox.current.value);
        formData.append("owner", props.currUser.uid);
        
        if (advancedMode) {
            formData.append("steps", steps);
            formData.append("scale", scale);
            formData.append("numImages", numImages);
        }
        else {
            formData.append("steps", 50);
            formData.append("scale", 7);
            formData.append("numImages", numImages);
        }
        //http://localhost:5001/aiarthouse/us-central1/app/generate
        //https://us-central1-aiarthouse.cloudfunctions.net/app/generate
        const data = await axios.post("https://us-central1-aiarthouse.cloudfunctions.net/app/generate", formData, {
            
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }
        });
        props.setImageIDs(current => [...current, ...data.data]);
        props.setShowImages(true);
        
        updateGeneratorStatus();
        setInterval(updateGeneratorStatus, 10000);

    }

    const updateGeneratorStatus = async () => {
        fetch("https://us-central1-aiarthouse.cloudfunctions.net/app/instances", {method: "GET"}).then((response) => response.text()).then((data) => {
            if(data == "TERMINATED") {
                setGeneratorStatus("Offline");
            }
            else {
                if(data == "RUNNING") {
                    setGeneratorStatus("Online");
                }
                else {
                    setGeneratorStatus("Starting...");
                }
            }

        });
    };

    useEffect(() => {
        updateGeneratorStatus();
    }, []);

useEffect(() => {
    setTokenCost(((steps / 50) * numImages).toFixed(0));
}, [steps, numImages]);

return (<div className='promptBox'>
    <div><h3>Prompt</h3></div>
    <input type='text' id='prompt' name='prompt' ref={promptBox} />
    <div><h3>Number of Images</h3></div>
    <div><select onChange={handleImagesChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select></div>

    <div style={{ display: "flex" }}>
        <h3>Advanced Mode</h3>
        <label className="switch">
            <input type="checkbox" onChange={(e) => setAdvancedMode(e.target.checked)}>
            </input>
            <span className="slider round"></span>
        </label>
    </div>


    <div className={advancedMode ? "advancedBox" : "advancedBox hide"}>
        {advancedMode ? <>
            <div className="horizontalDiv"><h3>Steps</h3><input type="range" min="25" max="100" step="5" onChange={handleStepsChange}></input><div className='tokenBox'><p>{steps}</p></div></div>
            <div className="horizontalDiv"><h3>Guidance Scale</h3><input type="range" defaultValue="7" min="3" max="15" step="1" onChange={handleScaleChange}></input><div className='tokenBox'><p>{scale}</p></div></div>

        </>
            : null}
    </div>

    <div className="horizontalDiv"><h3>Generator Status:</h3><p style={{marginLeft: 10, marginTop: "auto", marginBottom: "auto"}}>{generatorStatus}</p></div>
    <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
            <h3 style={{ margin: "auto" }}>Token cost: </h3>
            <div className='tokenBox' onMouseEnter={() => { setShowQuestion(true) }} onMouseLeave={() => { setShowQuestion(false) }}>
                <p>{tokenCost}</p>
                <div className="questionMark" onMouseEnter={() => { setShowQuestion(true) }}><p className="questionMarkText">?</p></div>

            </div>
        </div>
        <div className={showQuestion ? "questionBox" : "questionBox hide"} onMouseLeave={() => { setShowQuestion(false) }}>
            <p className="questionMarkText">Just for show</p>
        </div>
        <button className='button' value='Generate' onClick={generateImage}>Generate</button>
    </div>

</div>)
}
