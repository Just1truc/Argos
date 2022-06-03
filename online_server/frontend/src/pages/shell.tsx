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

    const Handleprompt = (value: string): void => {
        setCmd({
            command: value,
            output: ""
        });
    };
    const HandleSudo = (): void => {
        setSudo(!sudo);
    };

    return (
        <>
            <h1>Login</h1>
            <ShellScrean cmd={cmd} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} />
        </>
    );
}

export default Shell;