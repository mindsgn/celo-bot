import React, { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { variants } from "../constants/variants";
import { AdminSideNavigation } from "./adminSideNavigation";
import { Pages } from "./pages";
import { Data } from "./data";
import { Wallet } from "./wallet";

function Dashboard() {
  const [view, setView] = useState("pages");
  const { data: session, status } = useSession();
  const [animate, setAnimate] = useState("close");

  useEffect(() => {
    if (session && status === "authenticated") {
      setAnimate("open");
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
      <AdminSideNavigation setView={setView} />
      <Pages view={view} />
      <Data view={view} />
      <Wallet view={view} />
    </Box>
  );
}

export { Dashboard };
