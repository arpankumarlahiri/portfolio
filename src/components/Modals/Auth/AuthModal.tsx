import React, { useCallback } from "react";
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
import { useRecoilState } from "recoil";
import authModalState from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  function onClose() {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }

  React.useEffect(() => {
    if (user) onClose();
  }, [user]);

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
            {modalState.view === "resetPassword" ? (
              <ResetPassword />
            ) : (
              <>
                <OAuthButtons />
                <Text color={"gray.400"} fontWeight={"700"}>
                  OR
                </Text>
                <AuthInputs />
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
