import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import ShellScrean from "../components/ShellScrean";
import Navbar from "../components/Navbar";

const Shell = (props:any): JSX.Element => {
    const { id } = useParams();
    const [historie, setHistorie] = useState([{cmd: "example", output: "output", perm: "user"}]);
    const [sudo, setSudo] = useState(false);
    const [prompt, setPrompt] = useState("");

    const Handleprompt = (value: string) => {
        setPrompt(value);
    };
    const HandleSudo = () => {
        setSudo(!sudo);
    };

    const sendSpecificCmd = (cmd: string, perm: string) => {
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
        {
            "command" : String(cmd),
            "perm" : perm
        },
        {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("user_token")}`
            }
        }
        )
        .then((res: any) => {
            setHistorie([{
                cmd: String(cmd),
                output: res.data,
                perm: (sudo) ? "sudo" : "user"
            }, ...historie]);
        })
        .catch((err: any) => {
            console.log(err);
        });
        return;
    }
    const launchCmd = (event: any) => {
        if (!(event.key === "Enter"))
            return;
        
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
        {
            "command" : String(prompt),
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
                cmd: String(prompt),
                output: res.data,
                perm: (sudo) ? "sudo" : "user"
            }, ...historie]);
            setPrompt("");
            event.target.value = "";
        })
        .catch((err: any) => {
            console.log(err);
        });
        return;
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/services/${id}`, {
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("user_token")}`
            }
        })
        .catch((err: any) => {
            console.log(err);
            if (err.response.status === 401)
                window.location.href = "/login";
            else if (err.response.status === 400)
                window.location.href = "/clients";
        });
    }, []);

    return (
        <>
            <Navbar/>
            <ShellScrean history={historie} sudo={sudo} HandleSudo={HandleSudo} Handleprompt={Handleprompt} launchCmd={launchCmd} sendSpecificCmd={sendSpecificCmd} />
            <Outlet/>
        </>
    );
}

export default Shell;