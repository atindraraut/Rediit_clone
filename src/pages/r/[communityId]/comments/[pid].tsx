import { Post } from "@/src/atoms/postsAtom";
import About from "@/src/components/Community/About";
import PageContent from "@/src/components/Layout/PageContent";
import PostItem from "@/src/components/Posts/PostItem";
import { auth, firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import usePosts from "@/src/hooks/usePosts";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletepost, onVote } =
    usePosts();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateValue } = useCommunityData();
  const fetchPost = async (postId: string) => {
    try {
      console.log("hello");
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedpost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error) {
      console.log("single post ", error);
    }
  };
  useEffect(() => {
    const { pid } = router.query;
    if (pid && !postStateValue.selectedpost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedpost]);
  return (
    <PageContent>
      <>
        {/* selected post
        comments */}
        {postStateValue.selectedpost && (
          <PostItem
            post={postStateValue.selectedpost}
            onVote={onVote}
            onDeletePost={onDeletepost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedpost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedpost?.creatorId}
          />
        )}
      </>
      <>
        {/* About */}
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default PostPage;
