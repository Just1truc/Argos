import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";

const Shell = (props:any): JSX.Element => {
    const [historie, setHistorie] = useState([
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    },
]);
    const [sudo, setSudo] = useState(false);
    const [prompt, setPrompt] = useState("");


    const Handleprompt = (value: string): void => {
        console.log("salut");
        setPrompt(value);
    };
    const HandleSudo = (): void => {
        setSudo(!sudo);
    };
    const launchCmd = (): void => {
        console.log("salut");
    }
    return (
        <>
            <h1>{prompt}</h1>
            <ShellScrean history={historie} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} />
            <Outlet/>
        </>
    );
}

export default Shell;