import { MinusIcon } from "@chakra-ui/icons";
import { Box, Center, Text } from "@chakra-ui/react";
import { IconBase} from "react-icons";
import { BiCollapse } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PopUp = (props: any): JSX.Element => {
    const bg = useColorModeValue("gray.200", "gray.800");
    return (
        props.show ?
            <Box bg={bg} style={{position: "absolute", height: "100%", width: "100%", top:"65px"}}>
                <Box style={{display:"flex", height:"70px", flexDirection:"row", justifyContent:"space-between"}}>
                    <Center>
                        <Text fontSize={35} fontWeight={"bold"} marginLeft={"1cm"} marginTop={"0.2cm"} >
                            {props.title}
                        </Text>
                    </Center>
                    <Box as="button" style={{marginRight:"1cm"}} onClick={() => props.closePopUp()} >
                        <IconBase size={40} >
                            <AiOutlineCloseCircle size="100%" />
                        </IconBase>
                    </Box>
                </Box>
                <Box borderTop={10} border={"solid 0.4px"} marginLeft={"1cm"} marginRight={"1cm"} marginTop={"0.4cm"}/>
                {props.children}
            </Box>
            :
            <>
            </>
    );
}

export default PopUp;