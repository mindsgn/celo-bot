"use client";

import type { NextPage } from "next";
import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWallet } from "@meshsdk/react";
import { useMeshWallet } from "../src/context/walletContext";
import dynamic from "next/dynamic";
import { Hero, Footer, Loading } from "../src/components";

const InfinitScroll = dynamic(() => import("../src/components/infinitScroll"), {
  ssr: false,
});

const Home: NextPage = () => {
  const route = useRouter();
  const { connected } = useWallet();
  const { address } = useMeshWallet();

  useEffect(() => {
    if (address) {
      route.push(`/faucet?address=${address}`);
    }
  }, [connected, address]);

  return (
    <Box bgGradient="linear(to-r, #396afc, #2948ff)">
      <Loading />
      <Hero />
      <InfinitScroll />
      <Footer />
    </Box>
  );
};

export default Home;
