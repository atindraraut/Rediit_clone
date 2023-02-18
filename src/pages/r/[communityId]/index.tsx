import { Community, CommunityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import CreatePostLink from "@/src/components/Community/CreatePostLink";
import Header from "@/src/components/Community/Header";
import NotFound from "@/src/components/Community/NotFound";
import PageContent from "@/src/components/Layout/PageContent";
import Posts from "@/src/components/Posts/Posts";
import { auth, firestore } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type communityPageProps = {
  communityData: Community;
};

const communitypage: React.FC<communityPageProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const {setPostStateValue}=usePosts()

  const setCommunityStateValue = useSetRecoilState(CommunityState);
  if (!communityData) {
    return <NotFound />;
  }
  const getpostVotes = async () => {
    if (user) {
      const postVotesQueryRef = collection(
        firestore,
        `users/${user.uid}/postVotes`
      );
      const postQuery = query(postVotesQueryRef);
      const postDocs = await getDocs(postQuery);
      const votesValue = postDocs.docs.map((doc) => ({ ...doc.data() }));
      setPostStateValue((prev) => ({ ...prev, postVotes: votesValue as [] }));
    }
  };
  useEffect(() => {
    getpostVotes();
  }, [user]);
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    //could add error pages here ,learn it
    console.log("getServerSideProps error:commmunity", error);
    return {};
  }
}
export default communitypage;

