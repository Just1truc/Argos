import { Center,
    Flex,
    Grid,
    Stack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Card from "../components/card";

const Client = (): JSX.Element => {

    const name1 = "Paul";
    const name2 = "Jack";
    const name3 = "Mathilde";
    const name4 = "John";
    const name5 = "Jane";
    const name6 = "Jenny";
    const name7 = "David";
    const name8 = "Joshua";
    const name9 = "Léo";
    const name10 = "Léa";
    const name11 = "Justin";


    return (
        <>
            <Navbar/>
            <Center>
                <Grid templateColumns="repeat(4, 1fr)" gap="3" marginTop="4%">
                    <Card name={name1}/>
                    <Card name={name2}/>
                    <Card name={name3}/>
                    <Card name={name4}/>
                    <Card name={name5}/>
                    <Card name={name6}/>
                    <Card name={name7}/>
                    <Card name={name8}/>
                    <Card name={name9}/>
                    <Card name={name10}/>
                    <Card name={name11}/>
                </Grid>
            </Center>
        </>
    );
}

export default Client;
