import React from "react";
import { communityDataType } from "../../atoms/communitiesAtoms";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import PAGEMAXWIDTH from "../../Constants/layout";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
  communityData: communityDataType;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isjoined = !!communityStateValue?.mySnippets?.find(
    (_community) => _community.communityId === communityData.id
  );

  return (
    <Flex direction={"column"} height={"150px"}>
      <Box height={"50%"} bg={"blue.400"} />
      <Flex bg={"white"} flexGrow={1} justify={"center"}>
        <Flex width={"95%"} maxWidth={PAGEMAXWIDTH}>
          {communityData.imageURL ? (
            <></>
          ) : (
            <Icon
              as={FaReddit}
              color="blue.500"
              fontSize={64}
              position={"relative"}
              border={"4px solid white"}
              borderRadius={"full"}
              top={-3}
            />
          )}
          <Flex padding={"10px 16px"}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={"800"} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={"600"} fontSize={"10pt"} color={"gray.400"}>
                {`r/${communityData.id}`}
              </Text>
            </Flex>
            <Button
              variant={isjoined ? "outline" : "solid"}
              //   border={"2px"}
              height={"35px"}
              width={"80px"}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isjoined)}
            >
              {isjoined ? "joined" : "join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
