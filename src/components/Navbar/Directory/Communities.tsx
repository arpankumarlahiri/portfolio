import React from "react";
import CreateCommunityModal from "../../Modals/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import communityState from "../../../atoms/communitiesAtoms";
import { GrAdd } from "react-icons/gr";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={3} mb={4}>
          <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
                imageURL={snippet.imageURL}
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpenModal(true)}
        >
          <Flex alignItems="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Communities;
