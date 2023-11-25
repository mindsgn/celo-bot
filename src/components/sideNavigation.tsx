import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useWallet } from "@meshsdk/react";

function SideNavigation() {
  const { connected } = useWallet();
  const route = useRouter();

  return (
    <Box
      display={[
        "none",
        "none",
        connected ? "flex" : "none",
        connected ? "flex" : "none",
      ]}
      width="300px"
      height="100vh"
      left="0%"
      background="white"
      flexDir="column"
      justifyContent="space-between"
      padding="10px"
    >
      <Box flexDirection="column" paddingTop="100px">
        <Heading
          as={motion.div}
          onClick={() => route.push("/faucet")}
          cursor="pointer"
          padding="10px"
          size="md"
          whileHover={{
            scale: 1.05,
          }}
          color={route.pathname === "/faucet" ? "#BCCCD3" : "#126BD3"}
        >
          Free ADA Faucet
        </Heading>
        <Heading
          as={motion.div}
          onClick={() => route.push("/roullette")}
          cursor="pointer"
          padding="10px"
          size="md"
          whileHover={{
            scale: 1.05,
          }}
          color={route.pathname === "/roullette" ? "#BCCCD3" : "#126BD3"}
        >
          Roullette
        </Heading>
      </Box>

      <Box flexDirection="column" paddingTop="100px">
        <Heading
          as={motion.div}
          onClick={() => route.push("/terms")}
          cursor="pointer"
          padding="10px"
          size="xs"
          whileHover={{
            scale: 1.05,
          }}
          color={route.pathname === "/terms" ? "#BCCCD3" : "black"}
        >
          Terms and Condition
        </Heading>
        <Heading
          as={motion.div}
          onClick={() => route.push("/aml")}
          cursor="pointer"
          padding="10px"
          size="xs"
          whileHover={{
            scale: 1.05,
          }}
          color={route.pathname === "/aml" ? "#BCCCD3" : "black"}
        >
          AML Policy
        </Heading>
        <Heading
          as={motion.div}
          onClick={() => route.push("/privacy")}
          cursor="pointer"
          padding="10px"
          size="xs"
          whileHover={{
            scale: 1.05,
          }}
          color={route.pathname === "/privacy" ? "#BCCCD3" : "black"}
        >
          Privacy Notice
        </Heading>
      </Box>
    </Box>
  );
}

export { SideNavigation };
