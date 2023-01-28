import { AuthModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/src/firebase/error";

const SignUp: React.FC = () => {
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [SignupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setAuthModalState = useSetRecoilState(AuthModalState);

  const [error, setError] = useState("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (SignupForm.password !== SignupForm.confirmPassword) {
      setError("Paswords do not match!!");
      return;
    }
    createUserWithEmailAndPassword(SignupForm.email, SignupForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        mb={2}
        type="email"
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        mb={2}
        type="password"
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        mb={2}
        type="password"
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {(error || userError) && (
        <Text textAlign="center" fontSize="10pt" color="red">
          {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      <Button width="100%" height="36px" type="submit" isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text>Already a Redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "login" }));
          }}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
