import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommunityState } from "../atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
} from "../atoms/directoryMenuAtom";

const useDirectory = () => {
  const router = useRouter();
  const communityStateValue = useRecoilValue(CommunityState);
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);

  const toggleOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !directoryState.isOpen }));
  };

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({ ...prev, selectedMenuItem: menuItem }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleOpen();
    }
  };
  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        },
      }));
    }
  }, [communityStateValue]);

  return { directoryState, toggleOpen, onSelectMenuItem };
};
export default useDirectory;
