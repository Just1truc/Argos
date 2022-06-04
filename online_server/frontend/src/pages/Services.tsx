import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Center, Stack, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Services = (): JSX.Element => {
    
    const [services, setServices] = useState<any[]>([]);
    const { id } = useParams();
    console.log(id);
    console.log(process.env.REACT_APP_API_URL);

    function getServicesBox() {
        const servicesBox = [];
        let i = 0;
        for (let item of services) {
            i++;
            servicesBox.push(
                <Button height='100px' width='300px' border='2px' borderColor='grey' key={i} onClick={() => {
                    window.location.href = `/services/${id}/${item}`
                }} >
                    <Center >
                        <Stack direction='row' spacing={8}>
                            <Center>
                                <Text fontSize="2xl" fontWeight="bold">{item}</Text>
                            </Center>
                        </Stack>
                    </Center>
                </Button>        
            );
        }
        return servicesBox;
    }

    function getServices() {
        axios.get(`${process.env.REACT_APP_API_URL}/services/${id}`,
            {headers :
                {
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
                }
            }
        )
        .then((result) => {
            setServices(result.data);
        })
        .catch((error) => {
            if (!(error.response.status === 400)) {
                console.log(error.data);
                if (error.response.status === 401) {
                    window.location.href = "/login";
                }
            } else {
                window.location.href = "/clients";
            }
        });
    }

    useEffect(() => {
        getServices();
    }, []);


    return  (
        <>
            <Navbar/>
            <Center style={{marginTop:"2cm"}} >
            {getServicesBox()}
            </Center>
            <Outlet/>
        </>
    )
}

export default Services;