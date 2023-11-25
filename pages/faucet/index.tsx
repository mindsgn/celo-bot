"use client";

import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Box, Container, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWallet } from "@meshsdk/react";
import { useMeshWallet } from "../../src/context/walletContext";
import { Title, Button } from "../../src/components";
import { motion } from "framer-motion";
import { variants } from "../../src/constants/variants";

const { button } = variants;

const address = "shdjhsddhsuydjsdhgyushd";

const Faucet: NextPage = () => {
  const toast = useToast();
  const [clicked, setClicked] = useState(false);
  const route = useRouter();
  const { connected } = useWallet();
  const { address } = useMeshWallet();

  const truncateMiddle = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }

    const middle = Math.floor(text.length / 2);
    const halfMaxLength = Math.floor((maxLength - 3) / 2); // Reserve 3 characters for '...'
    const firstPart = text.substring(0, halfMaxLength);
    const lastPart = text.substring(text.length - halfMaxLength);

    return `${firstPart}...${lastPart}`;
  };

  const request = async () => {
    setClicked(true);

    await fetch(`/api/faucet?address=${address}`)
      .then((response) => {
        const { ok } = response;
        if (!ok) throw Error;
        setClicked(false);
        return response.json();
      })
      .then((response) => {
        toast({
          status: "success",
          position: "top-right",
          title: "1 ADA sent",
        });
        setClicked(false);
      })
      .catch((errr) => {
        setClicked(false);
        toast({
          status: "error",
          position: "top-right",
          title: "Failed to send. Please try again",
        });
      });
  };

  useEffect(() => {
    if (!address && !connected) {
      route.push("/");
    }
  }, [address]);

  return (
    <Container padding={100}>
      <Box background="white" padding={5} borderRadius={10}>
        <Box>
          <Heading textAlign={"center"} fontFamily={"heavy"} color="black">
            Get Free Tokens
          </Heading>
        </Box>
        <Title
          title=" Network"
          children={
            <Box
              width="100%"
              borderRadius={10}
              borderWidth={3}
              borderColor={"black"}
              padding={2}
            >
              <Heading fontFamily={"regular"} color="black" size="md">
                Main
              </Heading>
            </Box>
          }
        />
        <Title
          title="Token"
          children={
            <Box
              width="100%"
              borderRadius={10}
              borderWidth={3}
              borderColor={"black"}
              padding={2}
            >
              <Heading fontFamily={"regular"} color="black" size="md">
                ADA
              </Heading>
            </Box>
          }
        />
        <Title
          title="Address"
          children={
            <Box
              width="100%"
              borderRadius={10}
              borderWidth={3}
              borderColor={"black"}
              padding={2}
            >
              <Heading fontFamily={"regular"} color="black" size="md">
                {truncateMiddle(`${address}`, 20)}
              </Heading>
            </Box>
          }
        />
        <Button
          title="Submit"
          clicked={clicked}
          onClick={() => {
            request();
          }}
        />
      </Box>
    </Container>
  );
};

export default Faucet;
