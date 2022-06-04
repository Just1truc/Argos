import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";

const Shell = (props:any): JSX.Element => {
    const { id } = useParams();
    const [historie, setHistorie] = useState([
    {
        cmd: "ouais ouais ouais",
        output: "asdasdsadsadsadasd"
    }
    ]);
    const [sudo, setSudo] = useState(false);
    const [prompt, setPrompt] = useState("");

    const Handleprompt = (value: string) => {
        setPrompt(value);
    };
    const HandleSudo = () => {
        setSudo(!sudo);
    };
    const launchCmd = (event: any) => {
        if (!(event.key === "Enter"))
            return;
        
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
        {
            "command" : prompt,
            "perm" : (sudo) ? "root" : "user"
        },
        {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("user_token")}`
            }
        }
        )
        .then((res: any) => {
            setHistorie([{
                cmd: prompt,
                output: res.data
            }, ...historie]);
            setPrompt("");
        })
        .catch((err: any) => {
            console.log(err);
        });
        return;
    }
    return (
        <>
            <ShellScrean history={historie} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} launchCmd={launchCmd}/>
            <Outlet/>
        </>
    );
}

export default Shell;