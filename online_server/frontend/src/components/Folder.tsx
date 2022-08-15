import {
    Box,
    Button,
    Center,
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
import { BsFileEarmark, BsFileEarmarkText, BsFileEarmarkZip, BsFolder, BsImage, BsX } from 'react-icons/bs';

import { useColorModeValue, useColorMode } from '@chakra-ui/react';

const Folder = (props: any): JSX.Element => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState<String>("");
    const [fileContent, setFileContent] = useState<string>("");
    const [boxes, setBoxes] = useState<JSX.Element[]>([]);
    const background = useColorModeValue('var(--chakra-colors-gray-50)', 'var(--chakra-colors-gray-600)');
    const { colorMode, toggleColorMode } = useColorMode();
    document.documentElement.setAttribute('data-color-mode', colorMode)

    const toast = useToast();

    function chDir(f: string) {
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`, {
            command: `cd ${f.replaceAll("\"", "\\\"").replaceAll("\'", "\\\'").replaceAll("(", "\\(").replaceAll(")", "\\)")}`,
            perm: "user"
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("user_token")}`
            }
        }).then((res) => {
            toast({
                title: "Success",
                description: "Directory changed",
                status: "success",
                duration: 2000,
                isClosable: true
            });
            getFiles();
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 9000,
                isClosable: true
            });
        });

    }

    function getFileContent(f: string) {
        const bash_command : string = f.replaceAll("\"", "\\\"").replaceAll("\'", "\\\'").replaceAll("(", "\\(").replaceAll(")", "\\)");
        return axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`,
            {
                command: `bash -c "if [ $(($(stat -c%s ${bash_command}) <= 1000000)) -eq 1 ]; then cat ${bash_command}; else echo 'File is too big'; fi"`,
                perm: "root"
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                }
            })
            .then((res) => {
                toast({
                    title: "File Content loaded",
                    description: "File content loaded successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true
                });
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
                command: `bash -c "echo \\\"${fileContent.replaceAll("\"", "\\\\\\\"")}\\\" > ${file.replaceAll("\"", "\\\"").replaceAll("(", "\\(").replaceAll(")", "\\)")}"`,
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
                return;
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
        const file_formats = {
            "directory": "directory",
            "zip": "archive data",
            "pdf": "PDF document",
            "image": "image",
            "text": "text",
            "empty": "empty"
        }
        let files = data.split("\n");
        files = [...files, ". : directory", ".. : directory"];
        let all_files = []
        for (let i in files) {
            let splitted = files[i].split(":");
            if (splitted.length != 2) {
                continue;
            }
            let file = {
                name: splitted[0],
                type: "noopen",
                fulltype: splitted[1].trim()
            }
            let format: keyof typeof file_formats;
            for (format in file_formats) {
                const text = file_formats[format];
                console.log(file.fulltype);
                if (file.fulltype.includes(text)) {
                    file.type = format;
                    break;
                }
            }
            all_files.push(file);
        }
        const output: JSX.Element[] = [];
        const file_icons = {
            "directory": <BsFolder size={60} />,
            "zip": <BsFileEarmarkZip size={60} />,
            "pdf": <BsFileEarmark size={60} />,
            "image": <BsImage size={60} />,
            "text": <BsFileEarmarkText size={60} />,
            "empty": <BsFileEarmark size={60} />,
            "noopen": <BsX size={60} />
        }
        for (let i in all_files) {
            const file = all_files[i];
            const type: keyof typeof file_icons = (file.type as keyof typeof file_icons);
            output.push(
                <WrapItem key={i}>
                    <Box margin="auto" marginLeft={"1cm"} marginTop="0.5cm">
                        <Button height={"80px"} width={"80px"} onClick={() => {
                            if (file.type === "directory")
                                return chDir(file.name);
                            return [
                                setFileContent(""),
                                setFile(file.name),
                                getFileContent(file.name),
                                onOpen()
                            ]
                        }}>
                            <Center>
                                {
                                file_icons[type]
                                }
                            </Center>
                        </Button>
                        <Text width={"80px"} marginTop="0.2cm" >
                            {file.name}
                        </Text>
                    </Box>
                </WrapItem>
            );
        }
        setBoxes(output);
    }

    function getFiles() {
        console.log('Send file command');
        axios.post(`${process.env.REACT_APP_API_URL}/services/${id}/shell`, {
            command: "bash -c \"file *\"",
            perm: "root"
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
        console.log("Getting files");
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
                        <Textarea value={fileContent} onChange={(e) => setFileContent(e.target.value)} height={"100%"} />
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