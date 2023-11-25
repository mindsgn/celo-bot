"use client";
import { Box, Heading } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { TextButton } from "./textButton";

function AdminSideNavigation({ setView }: { setView: (view: string) => void }) {
  return (
    <Box
      position="relative"
      height="80vh"
      background="white"
      margin={10}
      padding={5}
      borderRadius={"20px"}
    >
      <TextButton
        title="DATA"
        onClick={() => {
          setView("data");
        }}
      />
      <TextButton title="PAGES" onClick={() => setView("pages")} />
      <TextButton title="WALLET" onClick={() => setView("wallet")} />
      <Button
        title="SIGN OUT"
        onClick={() => {
          signOut();
        }}
      />
    </Box>
  );
}

export { AdminSideNavigation };
