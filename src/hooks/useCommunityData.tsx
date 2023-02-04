import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Community, CommunityState } from "../atoms/communitiesAtom";
import { auth } from "../firebase/clientApp";
const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is the user signed in?
    //if not prompt for sign in
    if (isJoined) {
      leaveCommunity(communityData.id);
    }
    joinCommunity(communityData);
  };
  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get user snippets
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityData: string) => {};
  return {
    //data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
