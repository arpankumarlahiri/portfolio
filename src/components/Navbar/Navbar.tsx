import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import RightContent from "./RightComponent/RightContent";
import SearchBar from "./SearchBar";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
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
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image alt="logoFace" src="/images/samurailogo.png" height={"30px"} />
        <Text
          ml={2}
          fontSize={"lg"}
          display={{ base: "none", md: "flex" }}
          fontWeight="bold"
        >
          Sengoku Social
        </Text>
      </Flex>
      {!!user && <Directory />}
      <SearchBar user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
