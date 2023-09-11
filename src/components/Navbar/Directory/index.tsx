import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineLogin } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

type DirectoryProps = {};

const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 0, lg: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          width={{ base: "auto", lg: "200px" }}
          align={"center"}
          justifyContent={"space-between"}
        >
          <Flex align={"center"}>
            <Icon fontSize={22} as={TiHome} mr={2} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize={"10pt"} fontWeight={600}>
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
