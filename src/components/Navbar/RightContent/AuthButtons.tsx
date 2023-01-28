import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import {AuthModalState} from '../../../atoms/authModalAtom'

const AuthButtons: React.FC = () => {
    const setAuthButtonState=useSetRecoilState(AuthModalState)
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={()=>setAuthButtonState({open:true,view:'login'})}
      >
        Log in
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={()=>setAuthButtonState({open:true,view:'signup'})}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
