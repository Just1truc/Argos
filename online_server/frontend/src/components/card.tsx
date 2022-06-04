import {
    Text,
    Center,
    Stack,
    Button,
} from '@chakra-ui/react';

function getRandomInt(min: number, max: number){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ppMap = [require("../img/profil_picture/user.png"),
require("../img/profil_picture/anaxagore.png"),
require("../img/profil_picture/bear.png"),
require("../img/profil_picture/bee.png"),
require("../img/profil_picture/dolphin.png"),
require("../img/profil_picture/hen.png"),
require("../img/profil_picture/shark.png"),
require("../img/profil_picture/snake.png"),
require("../img/profil_picture/squirrel.png")];

const setProfilePicture = (id: number) => {
    let rand: number = getRandomInt(0, 70) / 10;
    let pp = require("../img/profil_picture/user.png")

    if (id % 17 === 0) {
        pp = require("../img/profil_picture/anaxagore.png")
        return pp;
    }

    rand =  parseInt(rand.toString());

    console.log("rand: " + rand);

    pp = ppMap[rand];

    return pp;
}

const Card = (props: any): JSX.Element => {

    const profilePicture = setProfilePicture(props.id);

    return(
        <>
            <Button height='100px' width='300px' border='2px' borderColor='grey' onClick={() => props.trigger()} >
                <Center >
                    <Stack direction='row' spacing={8}>
                        <Center>
                            <Text fontSize="2xl" fontWeight="bold">{props.name}</Text>
                        </Center>
                        <Center>
                            <img src={profilePicture} alt="profile" width={"55px"}/>
                        </Center>
                    </Stack>
                </Center>
            </Button>
        </>
    );
}

export default Card;
