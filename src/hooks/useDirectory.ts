import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import { FaReddit } from "react-icons/fa";
import communityState from "../atoms/communitiesAtoms";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();

  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    router?.push(menuItem.link);

    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const existingCommunity = communityStateValue.currentCommunity;

    if (existingCommunity?.id) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${existingCommunity.id}`,
          link: `r/${existingCommunity.id}`,
          icon: FaReddit,
          iconColor: "blue.500",
          imageURL: existingCommunity.imageURL,
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
  }, [communityStateValue?.currentCommunity]);

  return { directoryState, onSelectMenuItem, toggleMenuOpen };
};

export default useDirectory;
