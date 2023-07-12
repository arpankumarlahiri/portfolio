import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

type loginProps = {};

const Login: React.FC<loginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function onSubmit() {}
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm((prev) => ({
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
      />
      <Button type="submit" height={"36px"} width={"100%"} mb={2}>
        Log in
      </Button>
    </form>
  );
};
export default Login;
