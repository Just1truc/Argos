import React from "react";
import { useState } from "react";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";

const Shell = (props:any): JSX.Element => {
    const [cmd, setCmd] = useState({
        command: "",
        output: ""
    });
    const [sudo, setSudo] = useState(false);
    const [prompt, setPrompt] = useState("");
    const Handleprompt = (value: string): void => {
        console.log("salut");
        setPrompt(value);
    };
    const HandleSudo = (): void => {
        setSudo(!sudo);
    };

    return (
        <>
            <h1>{prompt}</h1>
            <ShellScrean cmd={cmd} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} />
        </>
    );
}

export default Shell;