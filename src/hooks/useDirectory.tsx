import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
} from "../atoms/directoryMenuAtom";

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);

  const toggleOpen = () => {
    setDirectoryState((prev) => ({ ...prev, isOpen: !directoryState.isOpen }));
  };

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({ ...prev, selectedMenuItem: menuItem }));
    router.push(menuItem.link);
    if(directoryState.isOpen){
        toggleOpen();
    }
  };

  return { directoryState, toggleOpen ,onSelectMenuItem};
};
export default useDirectory;
