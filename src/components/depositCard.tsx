import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Button } from "./Button";

function DepositCard({
  balance,
  deposit,
  withdraw,
}: {
  balance: number;
  deposit: () => void;
  withdraw: () => void;
}) {
  return (
    <Box
      marginX={5}
      marginY={10}
      background="white"
      padding={5}
      borderRadius={10}
    >
      <Box>
        <Heading fontFamily={"heavy"} color="black">
          {`BALANCE ${balance} ADA`}
        </Heading>
      </Box>
      <Box>
        <Heading fontFamily={"heavy"} color="black">
          {`TOTAL ${balance} ADA`}
        </Heading>
      </Box>
      <Button title="DEPOSIT" onClick={deposit} />
      <Button title="WITHDRAW" onClick={withdraw} />
    </Box>
  );
}

export { DepositCard };
