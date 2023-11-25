import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";

function Auth() {
  const { data: session, status } = useSession();
  const [animate, setAnimate] = useState("open");

  useEffect(() => {
    if (session && status === "authenticated") {
      setAnimate("close");
    }
  }, [status, session]);

  return (
    <Box
      as={motion.div}
      animate={animate}
      variants={variants.loading}
      position={"fixed"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      background={"rgba(0,0,0,0.2)"}
      height="100vh"
      width="100vw"
    >
      <Box>
        <Button
          title="SIGN IN"
          onClick={() => {
            signIn("google");
          }}
        />
      </Box>
    </Box>
  );
}

export { Auth };
