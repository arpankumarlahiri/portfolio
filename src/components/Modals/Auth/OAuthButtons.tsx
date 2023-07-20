import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
const OAuthButtons: React.FC = () => {
  return (
    <Flex alignSelf={"center"} mb={4} width={"100%"}>
      <Button variant={"oauth"} width={"100%"}>
        <Image
          alt={"Continue with Google"}
          src={"/images/googlelogo.png"}
          height={"20px"}
          mr={2}
        />
        Continue with Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
