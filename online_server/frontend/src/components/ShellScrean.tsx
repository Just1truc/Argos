import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style/ShellScrean.css";

const ShellScrean = (props: any): JSX.Element => {
    return (
        <main>
            <div className="prompt">
                <div className="output">
                </div>
                <div className="prompt--cmd">
                    <span className="prompt--cmd--user" onClick={props.HandleSudo}>@{props.sudo ? "Sudo" : "User"}</span>
                    <input type="text" value={props.prompt} onChange={(e) => props.Handleprompt(e.target.value)} />
                </div>
            </div>
        </main>
    );
}

export default ShellScrean;