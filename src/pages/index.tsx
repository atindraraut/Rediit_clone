import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import PageContent from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { Post } from "../atoms/postsAtom";
import Postloader from "../components/Posts/Postloader";
import { Stack } from "@chakra-ui/react";
import PostItem from "../components/Posts/PostItem";
import CreatePostLink from "../components/Community/CreatePostLink";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue,setPostStateValue,onSelectpost,onDeletepost,onVote } = usePosts();
  const buildUserHomeFeed = () => {};
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error) {
      console.log("buildNoUserHomeFeed", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  return (
    <PageContent>
      <>{/* {postfeed} */}
      <CreatePostLink/>
      {loading?(
        <Postloader/>
      ):(
        <Stack>
          {postStateValue.posts.map(post=>(
            <PostItem key={post.id}
            post={post}
            onSelectPost={onSelectpost}
            onDeletePost={onDeletepost}
            onVote={onVote}
            userVoteValue={postStateValue.postVotes.find(item=>item.postId===post.id)?.voteValue}
            userIsCreator={user?.uid===post.creatorId}
            homePage/>
          ))}
        </Stack>
      )}
      </>
      <>{/* {recomendation} */}</>
    </PageContent>
  );
}
