import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";
import authModalState from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";

type UserMenuProps = {
  user: User | undefined | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align={"center"}>
          <Flex align={"center"}>
            {user ? (
              <>
                <Icon
                  fontSize={28}
                  mr={1}
                  color={"gray.200"}
                  as={FaRedditSquare}
                />
                <Flex
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">10 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color={"gray.400"} as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontWeight={700}
              fontSize="10pt"
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align={"center"}>
                <Icon mr={2} fontSize={20} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontWeight={700}
              fontSize="10pt"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => signOut(auth)}
            >
              <Flex align={"center"}>
                <Icon mr={2} fontSize={20} as={MdOutlineLogin} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontWeight={700}
            fontSize="10pt"
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex align={"center"}>
              <Icon mr={2} fontSize={20} as={MdOutlineLogin} />
              Log in / Sign up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
