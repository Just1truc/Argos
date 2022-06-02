import React from "react";
import { Text, Box, Input, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { url } from "inspector";
import Header from "../components/Header";
import "./login.css";

const options = [
  { label: "Français", value: "Français" },
  { label: "English", value: "English" },
];

const App = (): JSX.Element => (
  <>
    <Box className="background">
      <Box className="logininput">
        <Text className="inputtitle">Log into your account</Text>
        <Box className="inputs" width="90%">
          <Input
            className="datainput"
            placeholder="Username"
            border="0px solid black"
            backgroundColor="#0d0d0d"
            width="90%"
          />
          <Input
            className="datainput"
            placeholder="Password"
            type="password"
            border="0px solid black"
            backgroundColor="#0d0d0d"
            width="90%"
          />
        </Box>
		<Box className="loginbutton" backgroundColor="#0d0d0d" width="40%" height="40px">
			Login
		</Box>
      </Box>
    </Box>
  </>
);

export default App;
