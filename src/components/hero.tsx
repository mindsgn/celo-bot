"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height={"80vh"}
      padding={[5, 5, 10, 20]}
    >
      <Box flex={1} display="flex" flexDirection="row">
        <Box display="flex" flex={1} flexDirection="column">
          <Heading fontFamily={"heavy"} size="4xl" textAlign={"left"}>
            Get Free ADA Tokens with Multiplada Faucet
          </Heading>
          <Text paddingTop={10}>
            Multiplada is a cardano-based platform that allows you to earn free
            ADA tokens.
          </Text>
        </Box>
        <Box display={["none", "none", "none", "flex"]} flex={1} />
      </Box>
    </Box>
  );
};

export { Hero };
