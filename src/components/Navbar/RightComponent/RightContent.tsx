import React from "react";
import AuthButton from "./AuthButton";
import { Button, Flex } from "@chakra-ui/react";
import AuthModal from "../../Modals/Auth/AuthModal";
import { auth } from "../../../firebase/clientApp";
import { User, signOut } from "firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};
const RightContent: React.FC<RightContentProps> = (props) => {
  return (
    <>
      <AuthModal />
      <Flex align={"center"}>
        {props.user ? <Icons /> : <AuthButton />}
        <UserMenu user={props.user} />
      </Flex>
    </>
  );
};
export default RightContent;
