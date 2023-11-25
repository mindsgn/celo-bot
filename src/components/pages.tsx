import React, { useState, useEffect } from "react";
import { Box, useToast, Input, Center, Heading } from "@chakra-ui/react";
import { Button } from "./Button";
import { Title } from "./title";

function Pages({ view }: { view: string }) {
  const [data, setData] = useState({
    page: "/",
    title: "",
    content: "",
  });

  const toast = useToast();
  const request = async () => {
    await fetch(`/api/admin/pages`, {
      method: "POST",
    })
      .then((response) => {
        const { ok } = response;
        if (!ok) throw Error;
        return response.json();
      })
      .then((response) => {
        toast({
          status: "success",
          position: "top-right",
          title: "Page updated",
        });
      })
      .catch((errr) => {
        toast({
          status: "error",
          position: "top-right",
          title: "Failed to update. Please try again",
        });
      });
  };

  return (
    <Box
      display={view === "pages" ? "flex" : "none"}
      background="white"
      width="60vw"
      height={"80vh"}
      padding={10}
      borderRadius={20}
    >
      <Center>
        <Heading fontFamily={"heavy"} color="black">
          PAGES
        </Heading>
      </Center>
      <Title
        title="Title"
        children={
          <Input
            width="100%"
            borderRadius={10}
            borderWidth={3}
            color="black"
            borderColor={"black"}
            padding={2}
            onChange={(event) => {
              const { target } = event;
              const { value } = target;
              setData({ ...data, title: value });
            }}
          />
        }
      />
      <Title
        title="Content"
        children={
          <Input
            width="100%"
            borderRadius={10}
            borderWidth={3}
            color="black"
            borderColor={"black"}
            padding={2}
            onChange={(event) => {
              const { target } = event;
              const { value } = target;
              setData({ ...data, content: value });
            }}
          />
        }
      />

      <Button onClick={() => request()} title="UPDATE" />
    </Box>
  );
}

export { Pages };
