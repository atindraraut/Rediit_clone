import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AuthModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";
const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const setAuthModalState=useSetRecoilState(AuthModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is the user signed in?
    //if not prompt for sign in
    if(!user){
        setAuthModalState({open:true,view:'login'});
        return;
    }
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
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      //creating a new community snippets
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      //updating the number of community members
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMember: increment(1),
      });
      //batch writes
      await batch.commit();
      //update recoil state to display in frontend
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("join community error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      //deleting  a new community snippets
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      //updating the number of community members
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMember: increment(-1),
      });
      //batch writes
      await batch.commit();
      //update recoil state to display in frontend
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leave community error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };
  return {
    //data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
