import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchBarProps = {
  // user
};

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <Flex flexGrow={1} alignItems={"center"} mr={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" height={"100%"}>
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize={"10pt"}
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height={"34px"}
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchBar;
