import { Community } from "@/src/atoms/communitiesAtom";
import NotFound from "@/src/components/Community/NotFound";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type communityPageProps = {
  communityData: Community;
};

const communitypage: React.FC<communityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound/>;
  }
  return <div>welcome to {communityData.id}</div>;
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
