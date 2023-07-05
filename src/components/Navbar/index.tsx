import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./SearchBar";
import RightContent from "./RightComponent/RightContent";

const index: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align={"center"}>
        <Image alt="logoFace" src="/images/redditFace.svg" height={"30px"} />
        <Image
          alt="logoFace"
          src="/images/redditText.svg"
          height={"46px"}
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchBar />
      <RightContent />
    </Flex>
  );
};
export default index;
