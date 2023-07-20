import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import authModalState from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import errorObject from "../../../firebase/errorMessage";

const Signup: React.FC = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, signUpError] =
    useCreateUserWithEmailAndPassword(auth);

  const setAuthModalState = useSetRecoilState(authModalState);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (signupForm.password !== signupForm.confirmPassword) {
      console.log(signupForm.password, signupForm.confirmPassword);
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      />
      {(!!error || !!signUpError?.message) && (
        <Text textAlign="center" mt={2} mb={2} fontSize="10pt" color="red">
          {error ||
            errorObject[signUpError?.message as keyof typeof errorObject]}
        </Text>
      )}
      <Button
        type="submit"
        height={"36px"}
        width={"100%"}
        mb={2}
        isLoading={loading}
      >
        Sign up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>ALready a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "login" }));
          }}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default Signup;
