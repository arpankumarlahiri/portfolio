import React from "react";
import CreateCommunityModal from "../../Modals/CreateCommunityModal";
import { MenuItem } from "@chakra-ui/react";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <CreateCommunityModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <MenuItem onClick={() => setOpenModal(true)}>create community</MenuItem>
    </>
  );
};
export default Communities;
