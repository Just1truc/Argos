import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style/ShellScrean.css";

const ShellScrean = (props: any): JSX.Element => {
    const prompt_logo = "$> ";
 
    function loadOutput(output:any) {
        let it = []
        for (let item of output.split('\n'))
            it.push(<p className="histo--output">{item}</p>);
        return it;
    }

    const histo = props.history.map((item: any, index: number) => {
        return (
            <div key={index} className="histo">
                <div style={{display:"flex", flexDirection:"row", marginTop:"1em"}}>
                    <p className="histo--cmd">{"[" + item.perm + "]" + prompt_logo}</p>
                    <p style={{color:"white", marginLeft:"0.5em"}}>{item.cmd}</p>
                </div>
                <div style={{marginTop:"0.3em"}}>
                {loadOutput(item.output)}
                </div>
            </div>
        );
    });

    return (
        <main className="full-prompt">
            <div className="prompt">
                <div className="output">
                    {histo}
                </div>
                <div className="prompt--cmd">
                    <span className="prompt--cmd--user" onClick={props.HandleSudo}>@{props.sudo ? "Sudo" : "User"}</span>
                    <input type="text" value={props.prompt} onChange={(e) => props.Handleprompt(e.target.value)} onKeyDown={(e) => props.launchCmd(e)} />
                </div>
            </div>
        </main>
    );
}

export default ShellScrean;