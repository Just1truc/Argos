import { Center,
    Flex,
    Grid,
    Stack,
    useColorMode
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Card from "../components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

const Client = (): JSX.Element => {

    const [clients, setClients] = useState<any[]>([]);
    const { colorMode, toggleColorMode } = useColorMode();

    function createCards() {
        const cards = [];
        for (let item of clients) {
            cards.push(
                <Card
                    name={item.name}
                    trigger={() => {
                        window.location.href = `/services/${item.id}`;
                    }}
                    key={item.id}
                />
            );
        }
        return cards;
    }

    function getClients() {
        axios.get(`${env.REACT_APP_API_URL}/clients`,
            {headers :
                {
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`
                }
            }
        )
        .then((result) => {
            setClients(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getClients();
    }, []);


    return (
        <>
            <Navbar/>
            <Center>
                <Grid templateColumns="repeat(4, 1fr)" gap="3" marginTop="4%">
                    {
                    clients.length === 0 ?
                    <></>
                    :
                    createCards()
                    }
                </Grid>
                {clients.length === 0 ?
                <>
                    <p style={{
                        color:!(colorMode === 'light') ? "white": "black",
                        marginTop:"4em",
                        fontWeight:"bold",
                        fontSize:"25px"}}
                    >No clients connected
                    </p>
                </>
                :
                <></>}
            </Center>
        </>
    );
}

export default Client;
