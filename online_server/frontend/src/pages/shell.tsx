import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";
import Navbar from "../components/Navbar";


// create type for { input: "", history: [] }
interface ShellProps {
    input: string;
    history: any[];
}

const Shell = (props: any): JSX.Element => {
    const { id } = useParams();
    const [sudo, setSudo] = useState(false);
    const [timeout, setTO] = useState(true);
    const [prompt, setPrompt] = useState<ShellProps>({
        input: "",
        history: []
    });

    const Handleprompt = (value: string) => {
        setPrompt({
            input: value,
            history: prompt.history
        });
    };
    const HandleSudo = () => {
        setSudo(!sudo);
    };

    const launchCmd = (command: string, sudo: boolean, history: boolean = true) => {
        if (command.replaceAll(" ", "") === "clear") {
            setPrompt({
                input: "",
                history: []
            });
            return;
        }
        const no_timeout = command.replaceAll(" ", "").match(/^cd/)
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
            {
                "command": (timeout && history && !no_timeout ? "timeout 10s " : "") + command,
                "perm": (sudo) ? "root" : "user"
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                }
            }
        ).then((res: any) => {
            if (history) {
                let newHistory = prompt.history;
                newHistory[0].output = res.data;
                setTimeout(() => {
                    (document.getElementById("shellPrompt") as HTMLInputElement)?.select();
                }, 100);
                setPrompt({
                    input: "",
                    history: newHistory
                });
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
        if (history) {
            let newHistory = prompt.history;
            newHistory.unshift({
                cmd: command,
                output: null,
                perm: (sudo) ? "sudo" : "user"
            });
            setPrompt({
                input: "",
                history: newHistory
            });
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/services/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            }
        })
            .catch((err: any) => {
                console.log(err);
                if (err.response.status === 401)
                    window.location.href = "/login";
                else if (err.response.status === 400)
                    window.location.href = "/clients";
            });
    },);

    return (
        <>
            <Navbar />
            <ShellScrean prompt={prompt} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} launchCmd={launchCmd} setTO={setTO} timeout={timeout}/>
            <Outlet />
        </>
    );
}

export default Shell;