import React from "react";
import { useState } from "react";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";

const Shell = (props:any): JSX.Element => {
    const [cmd, setCmd] = useState({
        command: "",
        output: ""
    });
    const [sudo, setSudo] = useState("User");

    return (
        <>
            <h1>Login</h1>
            <ShellScrean />
        </>
    );
}

export default Shell;