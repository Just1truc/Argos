import { Center, Flex, Box, Text, Input, Button, useToast } from '@chakra-ui/react';
import { AiOutlineApple, AiFillChrome } from "react-icons/ai";
import { FaSafari } from "react-icons/fa";
import { DiLinux, DiWindows } from "react-icons/di";
import { useState } from 'react';
import "../style/ShellScrean.css";


const SendUrl = (props: any) : JSX.Element => {

    const toast = useToast();

    const [url, setUrl] = useState("");
    const [os, setOs] = useState("None");

    function checkValues() {
        if (url === "" || url.match("^(http|https)://") === null) {
            toast({
                title: 'Error',
                description: "Please enter a url",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
              })
            return;
        }
        if (os === "None") {
            toast({
                title: 'Error',
                description: "Please select an OS",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
                })
            return;
        }
        props.launchCmd((os === "macOS" ? "open " : (os === "windows") ? "Start " : "xdg-open ") + url, false, false);
        toast({
            title: 'Success',
            description: "The url has been sent to the shell",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
        })
    }

    return (
        <>
            <Box borderTop={10} marginLeft={"1cm"} marginRight={"1cm"} marginTop={"1cm"} height={"80%"}>
                <Text style={{fontSize:"25px", fontWeight:"bolder"}}>
                    Description: 
                </Text>
                <Text style={{fontSize:"15px", fontFamily:"monospace", marginLeft:"1cm", marginTop:"0.3cm"}}>
                    This command will send a page to the user. The Distribution of the user's computer need to be known.<br></br>
                    Once the page has been sent to the user browser, mark that there is a possibility that you won't be able to<br></br>
                    access his computer.
                </Text>
                
                <Text style={{fontSize:"25px", fontWeight:"bolder", marginTop:"0.5cm"}}>
                    Select a Distribution:
                </Text>
                <Flex direction={["column", "row"]} marginTop="0.5cm" >
                    <Button height="70px" width="70px" onClick={() => setOs("macOS")} >
                        <Center>
                            <AiOutlineApple size={40} />
                        </Center>
                    </Button>
                    <Button height="70px" width="70px" marginLeft={"0.5cm"} onClick={() => setOs("linux")} >
                        <Center>
                            <DiLinux size={40} />
                        </Center>
                    </Button>
                    <Button height="70px" width="70px" marginLeft={"0.5cm"} onClick={() => setOs("windows")} >
                        <Center>
                            <DiWindows size={40} />
                        </Center>
                    </Button>
                </Flex>
                <Text style={{fontSize:"25px", fontWeight:"bolder", marginTop:"0.5cm"}}>
                    Send:
                </Text>
                <Flex direction={["column", "row"]} marginTop="0.5cm" justifyContent={"space-between"} >
                    <Input variant="flushed" placeholder='https://www.example.com' value={url} onChange={(e: any) => setUrl(e.target.value)} width={"95%"} onKeyDown={(e: any) => {
                        if (e.key === "Enter")
                            console.log("Should send a page to the user");
                    }} />
                    <Button onClick={() => checkValues()} >
                        Send
                    </Button>
                </Flex>
                <Flex flexDirection={["column", "row"]} marginTop="1cm" >
                    <Text style={{fontSize:"25px", fontWeight:"bolder"}}>
                        Choosen:
                    </Text>
                    <Text marginLeft={"0.5cm"} marginTop="0.25cm" >
                        {os}
                    </Text>
                </Flex>
            </Box>
        </>
    )
}

export default SendUrl;