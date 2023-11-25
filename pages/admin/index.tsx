"use client";
import { Box, Heading } from "@chakra-ui/react";
import { Auth, Dashboard } from "../../src/components";

function Admin() {
  return (
    <Box
      display={"flex"}
      flexDir={"row"}
      width="100vw"
      height="100vh"
      bgGradient="linear(to-r, #396afc, #2948ff)"
    >
      <Auth />
      <Dashboard />
    </Box>
  );
}

export default Admin;
