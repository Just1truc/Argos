import "../pages/browse.css";
import { Text, Box, Input, Button, Image, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

function Task(props:any) {
  const token = localStorage.getItem("token");
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Box
        className="clientcard"
      >
      </Box>
    </>
  );
}

export default Task;
