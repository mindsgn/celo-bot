import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

const { button } = variants;
const { hover, click } = button;

function Button({
  title,
  onClick,
  clicked = false,
}: {
  title: string;
  onClick: any;
  clicked?: boolean;
}) {
  return (
    <Box
      as={motion.div}
      whileHover={hover}
      whileTap={click}
      width="100%"
      borderRadius={15}
      background="#2948ff"
      padding={2}
      onClick={() => {
        if (clicked) return;
        onClick();
      }}
      marginTop={10}
      cursor={"pointer"}
    >
      {clicked ? (
        <Heading fontFamily={"heavy"} textAlign={"center"}>
          LOADING
        </Heading>
      ) : (
        <Heading fontFamily={"heavy"} textAlign={"center"}>
          {title.toUpperCase()}
        </Heading>
      )}
    </Box>
  );
}

export { Button };
