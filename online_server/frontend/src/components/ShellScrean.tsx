import React from "react";
import { useState } from "react";
import axios from "axios";
import "../style/ShellScrean.css";

const ShellScrean = (props:any): JSX.Element => {
    const [cmd, setCmd] = useState({
        command: "",
        output: ""
    });
    const [prompt, setPrompt] = useState("");
    const [sudo, setSudo] = useState("User");

    return (
        <>
            <div className="prompt">
                <div className="prompt--cmd">
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                </div>
            </div>
            <div className="output">
                {cmd.output}
            </div>
        </>
    );
}

export default ShellScrean;