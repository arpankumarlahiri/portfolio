import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import authModalState from "../../../atoms/authModalAtom";

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
        <ModalHeader>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"70%"}
            border={"1px solid red"}
          >
            {/* <OAuthButtons /> */}
            {/* <AuthInput /> */}
            {/* <ResetPassword /> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
