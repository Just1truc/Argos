import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import env from "react-dotenv";

const Login = (props: any): JSX.Element => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        if (!username || !password) {
            toast({
                title: "Error",
                description: "Please fill all the fields",
                position: "bottom-right",
                status: "error",
                duration: 2000,
                isClosable: true
            });
            return;
        }
        axios.post(`${env.REACT_APP_API_URL}login`,
        {
            "username": username,
            "password": password
        })
        .then((result) => {
          props.setConnection();
          localStorage.setItem("user_token", result.data.token);
          window.location.href = "/clients";
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast({
                title: "Error",
                description: "Invalid credentials",
                position: "bottom-right",
                status: "error",
                duration: 5000,
                isClosable: true
            });
          }
          }
        );
    }

  return (
    <>
      <Navbar/>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => handleLogin()}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
