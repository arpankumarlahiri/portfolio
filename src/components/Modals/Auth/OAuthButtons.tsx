import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../../firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex alignSelf={"center"} mb={4} width={"100%"}>
      <Button
        variant={"oauth"}
        width={"100%"}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image
          alt={"Continue with Google"}
          src={"/images/googlelogo.png"}
          height={"20px"}
          mr={2}
        />
        Continue with Google
      </Button>
      {!!error && (
        <Text textAlign="center" mt={2} mb={2} fontSize="10pt" color="red">
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
