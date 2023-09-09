import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import RightContent from "./RightComponent/RightContent";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align={"center"}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image alt="logoFace" src="/images/redditFace.svg" height={"30px"} />
        <Image
          alt="logoFace"
          src="/images/redditText.svg"
          height={"46px"}
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {!!user && <Directory />}
      <SearchBar user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
