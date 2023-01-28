import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,Text,
  Flex,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import {CgProfile} from "react-icons/cg"

type userMenuProps = {
  user?: User | null;
};

const userMenu: React.FC<userMenuProps> = ({ user }) => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 2px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray200" }}
      >
        {user ? (
          <Flex align="center">
            <Flex align="center">
              <>
                <Icon as={FaRedditSquare} fontSize={24} mr={1} color='gray.300'  />
              </>
            </Flex>
          </Flex>
        ) : (
          <div>no login</div>
        )}
      </MenuButton>
      <MenuList>
        <MenuItem><Flex><Icon as={CgProfile}/><Text>dfasd</Text></Flex></MenuItem>
        
      </MenuList>
    </Menu>
  );
};
export default userMenu;
