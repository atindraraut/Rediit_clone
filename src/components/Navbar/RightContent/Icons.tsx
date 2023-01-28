import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { BsArrowUpRightCircle,BsChatDots } from "react-icons/bs";
import { IoMdVideocam, IoMdHelpCircle,IoIosNotificationsOutline } from "react-icons/io";
import {GrAdd} from 'react-icons/gr'
const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoMdHelpCircle} fontSize={22}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoMdVideocam} fontSize={22}></Icon>
        </Flex>
      </Flex>
      <>
        {/* <Button
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign out
        </Button> */}
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoIosNotificationsOutline} fontSize={20}></Icon>
        </Flex>
        <Flex
        display={{base:"none",md:"flex"}}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize={20}></Icon>
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
