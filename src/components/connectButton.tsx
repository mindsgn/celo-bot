import React, { useState } from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useMeshWallet } from "../context/walletContext";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

const { button } = variants;
const { hover, click } = button;

function ConnectButton() {
  const { walletList, selectedWallet, connectWallet, wallet, balance } =
    useMeshWallet();
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box
      as={motion.div}
      whileHover={hover}
      whileTap={click}
      animate={"open"}
      position={"relative"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      cursor="pointer"
      borderRadius={15}
      background="#2948ff"
      padding={2}
      width={200}
      height={50}
      onClick={() => setShow(!show)}
    >
      <Box>
        {wallet && selectedWallet ? (
          <Box
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
            zIndex={2}
          >
            <Image margin={4} width="20px" src={selectedWallet} />
            <Heading size={"sm"} fontFamily={"heavy"}>{`${balance.toFixed(
              2
            )} ADA`}</Heading>
          </Box>
        ) : (
          <Heading size={"md"} fontFamily={"heavy"}>
            {"CONNECT WALLET"}
          </Heading>
        )}
      </Box>
      {show ? (
        <Box
          position={"absolute"}
          minWidth={200}
          background="white"
          marginTop={230}
          zIndex={1}
        >
          {walletList &&
            walletList.map((item: any) => {
              return (
                <Box
                  as={motion.div}
                  whileHover={hover}
                  whileTap={click}
                  key={item.name}
                  display={"flex"}
                  flexDir={"row"}
                  justifyContent={"flex-start"}
                  alignItems="center"
                  onClick={() => connectWallet(item.icon, item.name)}
                >
                  <Image margin={4} width="30px" src={item.icon} />
                  <Heading size={"sm"} color="black" fontFamily={"bold"}>
                    {item.name}
                  </Heading>
                </Box>
              );
            })}
        </Box>
      ) : null}
    </Box>
  );
}

export { ConnectButton };
