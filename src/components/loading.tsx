import React from "react";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

function Loading() {
  const [animate, setAnimate] = useState("open");

  useEffect(() => {
    setTimeout(() => {
      setAnimate("close");
    }, 5000);
  }, []);

  return (
    <Box
      as={motion.div}
      animate={animate}
      variants={variants.loading}
      display="flex"
      position={"fixed"}
      width="100vw"
      height="100vh"
      top={"0%"}
      bgGradient="linear(to-r, #396afc, #2948ff)"
      zIndex={10}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress isIndeterminate color="black" thickness={10} />
    </Box>
  );
}

export { Loading };
