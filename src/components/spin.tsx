import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Button } from "./Button";

function Spin({ request, clicked }: { request: () => void; clicked: boolean }) {
  return (
    <Box
      marginX={5}
      marginY={10}
      background="white"
      padding={5}
      borderRadius={10}
    >
      <Box>
        <Heading textAlign={"center"} fontFamily={"heavy"} color="black">
          SPIN TO MORE TOKENS
        </Heading>
      </Box>

      <Box width="300px" height={"300px"} />

      <Button title="SPIN" clicked={clicked} onClick={request} />
    </Box>
  );
}

export { Spin };
