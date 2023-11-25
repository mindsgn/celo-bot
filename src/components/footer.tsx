import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

const legal = [
  {
    name: "Anti Money Laundering",
    url: "/legal/aml",
  },
  {
    name: "Terms",
    url: "/legal/terms",
  },
  {
    name: "Privacy",
    url: "/legal/privacy",
  },
];

function Footer() {
  const router = useRouter();

  return (
    <Box
      as={motion.div}
      display="flex"
      width="100vw"
      top="0%"
      background="white"
      alignItems="center"
      zIndex={1}
      justifyContent="space-between"
      padding="10px"
      marginTop={10}
      color="black"
    >
      <Container display="flex">
        <Box flex={1} />
        <Box>
          <Heading fontFamily={"heavy"} size="md" marginY={2}>
            LEGAL
          </Heading>
          {legal.map((item) => {
            return (
              <Box
                as={motion.div}
                marginY={1}
                whileHover={{ scale: 1.02 }}
                key={`${item.name}`}
                cursor={"pointer"}
                onClick={() => {
                  router.push(`${item.url}`);
                }}
              >
                <Heading fontFamily={"heavy"} size="sm">
                  {`${item.name}`}
                </Heading>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export { Footer };
