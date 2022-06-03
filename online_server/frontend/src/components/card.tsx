import {
    Text,
    Center,
    Stack,
    Button,
} from '@chakra-ui/react';
const pp = require('../img/bear.png');

const Card = (props: any): JSX.Element => {

    return(
        <>
            <Button height='100px' width='300px' border='2px' borderColor='grey' onClick={props.trigger()} >
                <Center >
                    <Stack direction='row' spacing={8}>
                        <Center>
                            <Text fontSize="2xl" fontWeight="bold">{props.name}</Text>
                        </Center>
                        <Center>
                            <img src={pp} alt="profile" width={"50px"}/>
                        </Center>
                    </Stack>
                </Center>
            </Button>
        </>
    );
}

export default Card;
