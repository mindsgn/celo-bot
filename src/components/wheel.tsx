import React, { useState } from "react";
import { Wheel as RoulleteWheel } from "react-custom-roulette";
import { Text, Button, Box } from "@chakra-ui/react";

const data = [
  { option: 1 },
  { option: 2 },
  { option: 3 },
  { option: 4 },
  { option: 5 },
  { option: 6 },
  { option: 7 },
  { option: 8 },
  { option: 9 },
  { option: 10 },
  { option: 11 },
  { option: 12 },
  { option: 13 },
  { option: 15 },
  { option: 16 },
  { option: 17 },
  { option: 18 },
  { option: 19 },
  { option: 20 },
  { option: 21 },
  { option: 22 },
  { option: 23 },
];

function Wheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <RoulleteWheel
        mustStartSpinning={mustSpin}
        //@ts-ignore
        data={data}
        prizeNumber={prizeNumber}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <Button onClick={() => handleSpinClick()}>
        <Text>Spin</Text>
      </Button>
      <Box width="500px">
        {data.map((item) => (
          <Button>
            <Text>{item.option}</Text>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Wheel;
