import React from "react";

import { useOnScreen } from "../../useOnScreen";
import { useRef } from "react";

import bingus from "../../images/bingus.jpg";

export default function Section(props){
    const content = useRef(null);
    const visible = useOnScreen(content);
    return(<div className={visible ? "fpShow" : "fpHidden"}>
        <img  ref={content} className="fpSection" src={bingus}/></div>)
}