import { Community } from "@/src/atoms/communitiesAtom";
import { Post } from "@/src/atoms/postsAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import Postloader from "./Postloader";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  //use auth state
  const [user] = useAuthState(auth);
  const [loading, setloading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletepost,
    onSelectpost,
  } = usePosts();

  const getPosts = async () => {
    try {
      setloading(true);
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("posts", posts);
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error: any) {
      console.log("get post error", error.message);
    }
    setloading(false);
  };
  useEffect(() => {
    getPosts();
  }, [communityData ]);

  return (
    <>
      {loading ? (
        <Postloader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === item.id)
                  ?.voteValue
              }
              onVote={onVote}
              onSelectPost={onSelectpost}
              onDeletePost={onDeletepost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
