import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Center, Flex, Tooltip } from '@chakra-ui/react';
import { BiFolderOpen, BiPowerOff, BiShare } from "react-icons/bi";
import { useState } from 'react';
import "../style/ShellScrean.css";
import { IconButton } from '@chakra-ui/react';
import Navbar from './Navbar';
import PopUp from './popUp';

const ShellScrean = (props: any): JSX.Element => {
    const prompt_logo = "$> ";
    const [cursor, setCursor] = useState('pointer');
    const [showUrl, setShowUrl] = useState(false);
    const [showFolder, setShowFolder] = useState(false);
    
    function loadOutput(output:any) {
        let it = []
        for (let item of output.split('\n'))
            it.push(<p className="histo--output">{item}</p>);
        return it;
    }

    const histo = props.history.map((item: any, index: number) => {
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
                        <input type="text" placeholder='</Commands>' value={props.prompt} onChange={(e) => props.Handleprompt(e.target.value)} onKeyDown={(e) => props.launchCmd(e)} />
                    </div>
                </div>
                <div style={{position:"relative", height:"100%", marginTop:"2em", width:"50px", marginRight:"auto", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
                    <Center style={{display:"flex", flexDirection:"column"}}>
                        <BiShare size={30} style={{cursor:cursor, marginBottom:"0.5cm", marginLeft:"0.1cm"}} onMouseOver={() => setCursor('cursor')} onMouseOut={() => setCursor('pointer')} onClick={() => setShowUrl(true)} aria-label="tool boi" />
                        <BiFolderOpen size={30} style={{cursor:cursor, marginBottom:"0.5cm", marginLeft:"0.2cm"}} onMouseOver={() => setCursor('cursor')} onMouseOut={() => setCursor('pointer')} onClick={() => setShowFolder(true)} />
                        <BiPowerOff style={{cursor:cursor, marginBottom:"0.2cm", marginLeft:"0.1cm"}} size={30} onMouseOver={() => setCursor('cursor')} onMouseOut={() => setCursor('pointer')} onClick={() => props.sendSpecificCmd("shutdown -h now", "root")} />
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