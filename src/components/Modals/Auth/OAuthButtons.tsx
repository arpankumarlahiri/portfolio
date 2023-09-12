import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { auth, firestore } from "../../../firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { USERS } from "../../../Constants/collection";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  async function signinHandler() {
    const newUserCredentials = await signInWithGoogle();
    if (newUserCredentials?.user?.uid) {
      const userRef = doc(firestore, USERS, newUserCredentials?.user?.uid);
      await setDoc(
        userRef,
        JSON.parse(JSON.stringify(newUserCredentials.user))
      );
    }
  }

  return (
    <Flex flexDirection={"column"} alignSelf={"center"} mb={4} width={"100%"}>
      <Button
        variant={"oauth"}
        width={"100%"}
        isLoading={loading}
        onClick={signinHandler}
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
