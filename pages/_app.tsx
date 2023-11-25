"use client";

import React from "react";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { MeshProvider } from "@meshsdk/react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { theme } from "../src/theme";
import Navigation from "../src/components/navigation";
import { WalletProvider } from "../src/context/walletContext";
import { Global } from "@emotion/react";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={`
           @font-face {
              font-family: 'bold';
              src: url('/fonts/SF-Pro-Rounded-Bold.otf');
            }
            @font-face {
              font-family: 'heavy';
              src: url('/fonts/SF-Pro-Rounded-Heavy.otf');
            }
            @font-face {
              font-family: 'medium';
              src: url('/fonts/SF-Pro-Rounded-Medium.otf');
            }
            @font-face {
              font-family: 'regular';
              src: url('/fonts/SF-Pro-Rounded-Regular.otf');
            }
            @font-face {
              font-family: 'semi';
              src: url('/fonts/SF-Pro-Rounded-Semibold.otf');
            }
            body{
              font-family: 'medium';
            }
      `}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/spin-wheel@4.3.0/dist/spin-wheel-iife.js"
        strategy="lazyOnload"
      />
      <SessionProvider>
        <WalletProvider>
          <MeshProvider>
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo(0, 0);
                }
              }}
            >
              <Navigation />
              <Component {...pageProps} />
            </AnimatePresence>
          </MeshProvider>
        </WalletProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
