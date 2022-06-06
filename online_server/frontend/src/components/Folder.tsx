import { Box,
    Button,
    Center,
    Flex,
    Stack,
    Text,
    Wrap,
    WrapItem,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useToast,
    Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlineFile } from 'react-icons/ai';

const Folder = (props: any) : JSX.Element => {
    const [files, setFiles] = useState<String>("");
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState<String>("");
    const [fileContent, setFileContent] = useState<string>("");
    const [boxes, setBoxes] = useState<JSX.Element[]>([]);
    const toast = useToast();

    function getFileContent(f: string) {
        return axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
        {
            command: `cat ${f}`,
            perm: "root"
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            }
        })
        .then((res) => {
            return [setFileContent(res.data)];
        })
        .catch((err) => {
            toast({
                title: 'Error',
                description: err.data,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
              })
        });
    }

    function sendModifiedContent() {
        return axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
        {
            command: `echo "${fileContent.replaceAll("\"", "\\\"").replaceAll("\'", "\\\'")}" > ${file}`,
            perm: "root"
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            }
        })
        .then((res) => {
            toast({
                title: 'Success',
                description: "The file has been modified",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return ;
        })
        .catch((err) => {
            toast({
                title: 'Error',
                description: err.data,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
              })
        });
    }

    function getBoxes(data: string) {
        const output: JSX.Element[] = [];
        let test : string[] = [];
        data.split("\n").forEach((element: string) => {
            if (element.replaceAll(" ", "").length > 0) {
                test.push(element.replace("./", ""));
            }
        });
        for (let i of test) {
            output.push(
                <WrapItem key={i}>
                    <Box margin="auto" marginLeft={"1cm"} marginTop="0.5cm">
                        <Button height={"80px"} width={"80px"} onClick={() => {
                            return [
                            setFileContent(""),
                            setFile(i),
                            getFileContent(i),
                            onOpen()
                            ]
                            }}>
                            <Center>
                                <AiOutlineFile size={60}/>
                            </Center>
                        </Button>
                        <Text width={"80px"} marginTop="0.2cm" >
                            {i}
                        </Text>
                    </Box>
                </WrapItem>
            );
        }
        setBoxes(output);
    }

    function getFiles() {
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`, {
            command: "bash -c \"file * | grep ':.* text' | cut -d : -f 1\"",
            perm : "root"
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then((res) => {
            getBoxes(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <>
            <Box borderTop={10} marginLeft={"1cm"} marginRight={"1cm"} marginTop={"1cm"} height={"80%"} overflow={"scroll"} overflowX="hidden" borderLeft={"none"} borderRight="none" >
                <Wrap align={"start"} >
                    {boxes}
                </Wrap>
            </Box>
            
            <Modal isOpen={isOpen} onClose={onClose} size={"full"} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit: {file}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea value={fileContent} placeholder="Text.." onChange={(e) => setFileContent(e.target.value)} height={"100%"} width={"100%"} >
                    </Textarea>
                </ModalBody>

                <ModalFooter>
                  <Button variant={"ghost"} mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme={'green'} onClick={sendModifiedContent} >Modify</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </>
    )
}

export default Folder;