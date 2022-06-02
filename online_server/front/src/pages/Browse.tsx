import { Box, Image, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoClose } from "react-icons/io5";
import Header from "../components/Header";
import { Navigation } from "swiper";

import axios from "axios";
import "./browse.css";

import "swiper/css";
import "swiper/css/navigation";

const App = (): JSX.Element => {
  const [clientList, setClientList] = useState([]);
  const token = localStorage.getItem("token");

  const getClients = () => {
    axios
      .get("http://localhost:3000/clients", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((data) => {
        console.log("data");
        console.log(data.data);
        setClientList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <Header />
      <Box className="background"></Box>
    </>
  );
};

export default App;
