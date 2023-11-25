"use client";

import React, { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { Box, Container, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWallet } from "@meshsdk/react";
import { useMeshWallet } from "../../src/context/walletContext";
import { Title, Button } from "../../src/components";
import { motion } from "framer-motion";
import { variants } from "../../src/constants/variants";
import Script from "next/script";
import { DepositCard, Spin } from "../../src/components";
import { clientPromise } from "../../src/utils/database";

const Faucet: NextPage = () => {
  const toast = useToast();
  const [balance, setBalance] = useState(0);
  const [clicked, setClicked] = useState(false);
  const route = useRouter();
  const { connected } = useWallet();
  const props = {
    items: [
      {
        label: "one",
      },
      {
        label: "two",
      },
      {
        label: "three",
      },
    ],
  };
  const { address } = useMeshWallet();

  const getBalance = async () => {
    await fetch(`/api/ledger/balance?address=${address}`)
      .then((response) => {
        const { ok } = response;
        if (!ok) throw Error;
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const request = async () => {
    setClicked(true);

    await fetch(`/api/ledger/spin?address=${address}`)
      .then((response) => {
        const { ok } = response;
        if (!ok) throw Error;
        setClicked(false);
        return response.json();
      })
      .then((response) => {
        const { result, balance } = response;
        setBalance(balance);
        toast({
          status: "success",
          position: "top-right",
          title: `${result}`,
        });
        setClicked(false);
      })
      .catch((err) => {
        setClicked(false);
        toast({
          status: "error",
          position: "top-right",
          title: "Failed to Play. Please topup or Try again later",
        });
      });
  };

  useEffect(() => {
    if (address) {
      getBalance();
    }
  }, []);

  return (
    <Box paddingTop={100}>
      <Container display={"flex"} flexDir={"row"}>
        <Heading>BALANCE: {balance}</Heading>
      </Container>

      <Container display={"flex"} flexDir={"row"}>
        <Spin clicked={clicked} request={() => request()} />
      </Container>
    </Box>
  );
};

export async function GetServerSideProps() {}

export default Faucet;
