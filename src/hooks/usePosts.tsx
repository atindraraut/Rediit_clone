import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { PostState } from "../atoms/postsAtom";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(PostState);
  useEffect(() => {
    console.log("poststatevalue", postStateValue);
  }, [postStateValue]);

  const onVote = async () => {};

  const onSelectpost = () => {};

  const onDeletepost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletepost,
    onSelectpost,
  };
};
export default usePosts;
