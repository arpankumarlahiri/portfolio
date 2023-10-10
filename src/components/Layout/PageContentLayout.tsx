import { Flex } from "@chakra-ui/react";
import React from "react";
import PAGEMAXWIDTH from "../../Constants/layout";

type PageContentLayoutProps = {
  children: [React.ReactNode, React.ReactNode];
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
  return (
    <Flex justify={"center"} p={"16px 0px"}>
      <Flex width={"95%"} justify={"center"} maxWidth={PAGEMAXWIDTH}>
        <Flex width={{ base: "100&", md: "65%" }} mr={{ base: 0, md: 6 }}>
          {children[0]}
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} flexGrow={1}>
          {children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContentLayout;
