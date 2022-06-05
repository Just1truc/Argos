import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Center, Flex, Tooltip } from '@chakra-ui/react';
import { BiFolderOpen, BiPowerOff, BiShare, BiStopCircle } from "react-icons/bi";
import { useState } from 'react';
import "../style/ShellScrean.css";
import { IconButton, Spinner } from '@chakra-ui/react';
import Navbar from './Navbar';
import PopUp from './popUp';


const ShellScrean = (props: any): JSX.Element => {
    const prompt_logo = "$> ";
    const [showUrl, setShowUrl] = useState(false);
    const [showFolder, setShowFolder] = useState(false);

    const loading = props.prompt.history.length > 0 && props.prompt.history[0].output == null
    const disabledButton: React.CSSProperties = {opacity: (loading ? "0.5" : "1"), pointerEvents: (loading ? "none" : "auto")}

    function loadOutput(output:any) {
        if (!output) {
            return <div style={{width: "80px"}}>
            <Spinner ml={5} size='md' color="white" />
            </div>;
        }
        let it = []
        for (let item of output.split('\n'))
            it.push(<p className="histo--output">{item}</p>);
        return it;
    }

    const histo = props.prompt.history.map((item: any, index: number) => {
        return (
            <div key={index} className="histo">
                <div style={{display:"flex", flexDirection:"row", marginTop:"1em"}}>
                    <p className="histo--cmd">{"[" + item.perm + "]" + prompt_logo}</p>
                    <p style={{color:"white", marginLeft:"0.5em"}}>{item.cmd}</p>
                </div>
                <div style={{marginTop:"0.3em"}}>
                {loadOutput(item.output)}
                </div>
            </div>
        );
    });

    return (
        <>
            <main className="full-prompt" style={{display:"flex", flexDirection:"row"}} >
                <div className="prompt">
                    <div className="output">
                        {histo}
                    </div>
                    <div className="prompt--cmd">
                        <span className="prompt--cmd--user" onClick={props.HandleSudo}>@{props.sudo ? "Sudo" : "User"}</span>
                        <input id="shellPrompt" disabled={loading} type="text" placeholder='</Commands>' value={props.prompt.input} onChange={(e) => props.Handleprompt(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                props.launchCmd((e.target as HTMLInputElement).value, props.sudo);
                            }
                        }} />
                        <span className="prompt--cmd--timeout" onClick={() => props.setTO(!props.timeout)}>{props.timeout ? "10s" : "inf."}</span>
                    </div>
                </div>
                <div style={{position:"relative", height:"100%", marginTop:"2em", width:"50px", marginRight:"auto", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
                    <Center style={{display:"flex", flexDirection:"column"}}>
                        {props.timeout ? <></> :
                            <BiStopCircle size={30} style={{cursor: "pointer", marginBottom:"0.5cm", marginLeft:"0.1cm", color: "indianred"}} onClick={() => props.launchCmd("stop", true, false)} aria-label="tool boi" />
                        }
                        <BiShare size={30} style={{cursor: "pointer", marginBottom:"0.5cm", marginLeft:"0.1cm", ...disabledButton}} onClick={() => setShowUrl(true)} aria-label="tool boi" />
                        <BiFolderOpen size={30} style={{cursor: "pointer", marginBottom:"0.5cm", marginLeft:"0.2cm", ...disabledButton}} onClick={() => setShowFolder(true)} />
                        <BiPowerOff style={{cursor: "pointer", marginBottom:"0.2cm", marginLeft:"0.1cm", ...disabledButton}} size={30} onClick={() => props.launchCmd("shutdown -h now", true, false)} />
                    </Center>
                </div>
            </main>
            <PopUp show={showUrl} closePopUp={() => setShowUrl(false)} title={"Send a Internet page"} >
                <h1>UrlBox</h1>
            </PopUp>
            <PopUp show={showFolder} closePopUp={() => setShowFolder(false)} title={"Open the folder"} >
                <h1>Folder</h1>
            </PopUp>
        </>
    );
}

export default ShellScrean;