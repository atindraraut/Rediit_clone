import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Community, CommunityState } from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";
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
      return;
    }
    joinCommunity(communityData);
  };
  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get user snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log("here are the snippets", snippets);
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const joinCommunity = (communityData: Community) => {
    console.log("join");
  };
  const leaveCommunity = (communityData: string) => {
    console.log("leave");
  };
  return {
    //data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
