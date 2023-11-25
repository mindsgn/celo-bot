"use client";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "white",
        background: "#2948ff",
      },
    },
  },
});

export { theme };
