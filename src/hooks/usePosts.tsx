import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Post, PostState } from "../atoms/postsAtom";
import { firestore, storage } from "../firebase/clientApp";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(PostState);
  useEffect(() => {
    console.log("poststatevalue", postStateValue);
  }, [postStateValue]);

  const onVote = async () => {};

  const onSelectpost = () => {};

  const onDeletepost = async (post: Post): Promise<boolean> => {
    try {
      //check if there is an image
      if (post.imageURL) {
        const imageRef = ref(storage, `post/${post.id}/image`);
        await deleteObject(imageRef);
      }
      //delete post document from firestore
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      //update recoil state  
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletepost,
    onSelectpost,
  };
};
export default usePosts;
