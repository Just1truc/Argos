import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Center, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import "../style/ShellScrean.css";

const ShellScrean = (props: any): JSX.Element => {
    const prompt_logo = "$> ";
    const [cursor, setCursor] = useState('pointer');
    
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
        <main className="full-prompt" style={{display:"flex", flexDirection:"row"}} >
            <div className="prompt">
                <div className="output">
                    {histo}
                </div>
                <div className="prompt--cmd">
                    <span className="prompt--cmd--user" onClick={props.HandleSudo}>@{props.sudo ? "Sudo" : "User"}</span>
                    <input type="text" value={props.prompt} onChange={(e) => props.Handleprompt(e.target.value)} onKeyDown={(e) => props.launchCmd(e)} />
                </div>
            </div>
            <div style={{position:"relative", height:"100%", marginTop:"2em", marginLeft:"-100px", width:"50px", marginRight:"50px", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
                <Center style={{display:"flex", flexDirection:"column"}}>
                    <EditIcon boxSize={6} style={{cursor:cursor}} marginBottom="0.5cm" onMouseOver={() => setCursor('cursor')} onMouseOut={() => setCursor('pointer')} onClick={() => console.log("Should open current dir and give possibility to read a file")} />
                    <DeleteIcon style={{cursor:cursor}} boxSize={6} marginBottom="0.3cm" onMouseOver={() => setCursor('cursor')} onMouseOut={() => setCursor('pointer')} onClick={() => props.sendSpecificCmd("shutdown -h now", "root")} />
                </Center>
            </div>
        </main>
    );
}

export default ShellScrean;