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

const Login = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        if (!email || !password) {
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
        try {
            const result = await axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: {
                    email: email,
                    password: password
                }
            });
            if (result.status !== 200 || !result.data.token) {
                toast({
                    title: "Error",
                    description: "Invalid credentials",
                    position: "bottom",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
                return;
            }
            localStorage.setItem("user_token", result.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occured",
                position: "bottom",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
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
                  onClick={async () => await handleLogin()}
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
