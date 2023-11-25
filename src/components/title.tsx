"use client";

import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Title = ({
  title,
  children,
  textAlign = "left",
}: {
  title: string;
  children?: any;
  textAlign?: string;
}) => {
  return (
    <Box paddingTop={5}>
      <Heading fontFamily={"bold"} color="black" size="md">
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export { Title };
