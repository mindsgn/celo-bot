import React, { useState, useEffect } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useMeshWallet } from "../context/walletContext";
import { ConnectButton } from ".";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();
  const [animate, setAnimate] = useState("close");

  const { walletList, selectedWallet, connectWallet, wallet, balance } =
    useMeshWallet();
  const [show, setShow] = useState<boolean>(false);

  const select = (icon: string, name: string) => {
    connectWallet(icon, name);
    setShow(!show);
  };

  useEffect(() => {
    if (router.pathname !== "/admin") {
      setTimeout(() => {
        setAnimate("open");
      }, 5000);
    }
  }, []);

  return (
    <Box
      as={motion.div}
      animate={animate}
      variants={variants.navigation}
      display="flex"
      width="100vw"
      top="0%"
      position="fixed"
      background="white"
      alignItems="center"
      zIndex={1}
      justifyContent="space-between"
      padding="10px"
    >
      <Image cursor="pointer" alt="logo" width="8em" src="/logo.png" />
      <ConnectButton />
    </Box>
  );
}

export default Navigation;
