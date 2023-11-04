import React from "react";
import PageContentLayout from "../../../components/Layout/PageContentLayout";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

type SubmitProps = {};

const Submit: React.FC<SubmitProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContentLayout>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {!!user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContentLayout>
  );
};
export default Submit;
