import React from "react";
import PageContentLayout from "../../../components/Layout/PageContentLayout";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import About from "../../../components/Community/About";

type SubmitProps = {};

const Submit: React.FC<SubmitProps> = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContentLayout>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {!!user && <NewPostForm user={user} />}
      </>
      <>
        {!!communityStateValue?.currentCommunity && (
          <About communityData={communityStateValue?.currentCommunity} />
        )}
      </>
    </PageContentLayout>
  );
};
export default Submit;
