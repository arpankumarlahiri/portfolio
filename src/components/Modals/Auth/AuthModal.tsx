import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import authModalState from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  function onClose() {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }
  return (
    <Modal isOpen={modalState.open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          pb={6}
        >
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"70%"}
          >
            <OAuthButtons />
            <Text color={"gray.400"} fontWeight={"700"}>
              OR
            </Text>
            <AuthInputs />
            {/* <ResetPassword /> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
