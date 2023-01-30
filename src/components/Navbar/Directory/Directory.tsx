import { AuthModalState } from "@/src/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, Text, MenuButton, MenuList } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { useSetRecoilState } from "recoil";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const userMenu: React.FC = () => {
  const setAuthModalState = useSetRecoilState(AuthModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 2px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray200" }}
        mr={2}
        ml={{ base: 0, md: 2 }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "none", lg: "200px" }}
        >
          <Flex align="center">
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities/>
      </MenuList>
    </Menu>
  );
};
export default userMenu;
