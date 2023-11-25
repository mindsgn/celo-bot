import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

const { button } = variants;
const { hover, click } = button;

function TextButton({
  title,
  onClick,
  active = false,
}: {
  title: string;
  onClick: any;
  active?: boolean;
}) {
  return (
    <Box
      as={motion.div}
      whileHover={hover}
      whileTap={click}
      width="100%"
      borderRadius={15}
      background="none"
      padding={2}
      onClick={() => {
        onClick();
      }}
      marginTop={10}
      cursor={"pointer"}
    >
      <Heading color="#2948ff" fontFamily={"heavy"} textAlign={"center"}>
        {title.toUpperCase()}
      </Heading>
    </Box>
  );
}

export { TextButton };
