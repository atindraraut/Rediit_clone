import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Text,
  Flex,
  MenuDivider,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosStar } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { VscAccount } from "react-icons/vsc";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { AuthModalState } from "@/src/atoms/authModalAtom";
import { CommunityState } from "@/src/atoms/communitiesAtom";

type userMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<userMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const logout = async () => {
    await signOut(auth);
    // resetCommunityState();
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 2px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex align="center">
                    <Icon as={IoIosStar} mr={1} color="brand.100" />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex>
                <Icon as={CgProfile} mr={2} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex>
                <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
                Log out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => {
                setAuthModalState({ open: true, view: "login" });
              }}
            >
              <Flex>
                <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
                Log In / Sign up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
