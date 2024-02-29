import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
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
import useDirectory from "../../../hooks/useDirectory";

type DirectoryProps = {};

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 0, lg: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          width={{ base: "auto", lg: "200px" }}
          align={"center"}
          justifyContent={"space-between"}
        >
          <Flex align={"center"}>
            {directoryState?.selectedMenuItem?.imageURL ? (
              <Image
                borderRadius="full"
                boxSize="24px"
                src={directoryState.selectedMenuItem.imageURL}
                mr={2}
                alt="community icon"
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                color={directoryState.selectedMenuItem.iconColor}
                as={directoryState.selectedMenuItem.icon}
              />
            )}
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize={"10pt"} fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
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
