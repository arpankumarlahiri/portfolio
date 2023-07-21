import React from "react";
import AuthButton from "./AuthButton";
import { Button, Flex } from "@chakra-ui/react";
import AuthModal from "../../Modals/Auth/AuthModal";
import { auth } from "../../../firebase/clientApp";
import { signOut } from "firebase/auth";

type RightContentProps = {
  user: any;
};
const RightContent: React.FC<RightContentProps> = (props) => {
  return (
    <>
      <AuthModal />
      <Flex align={"center"}>
        {props.user ? (
          <Button
            variant={"outline"}
            height={"28px"}
            display={{ base: "none", sm: "flex" }}
            width={{ base: "70px", md: "110px" }}
            mr={2}
            onClick={() => signOut(auth)}
          >
            log out
          </Button>
        ) : (
          <AuthButton />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
