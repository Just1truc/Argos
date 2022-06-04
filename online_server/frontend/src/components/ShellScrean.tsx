import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style/ShellScrean.css";

const ShellScrean = (props: any): JSX.Element => {
    const prompt_logo = ((props.sudo) ? "sudo" : "user") + "$> ";
 
    const histo = props.history.map((item: any, index: number) => {
        return (
            <div key={index} className="histo">
                <p className="histo--cmd">{prompt_logo}{item.cmd}</p>
                <p className="histo--output">{item.output}</p>
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