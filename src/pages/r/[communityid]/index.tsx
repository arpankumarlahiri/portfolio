import React from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { communityDataType } from "../../../atoms/communitiesAtoms";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import Header from "../../../components/Community/Header";

type communityPageProps = {
  communityData: communityDataType | null;
};

const communityPage: React.FC<communityPageProps> = ({ communityData }) => {
  if (!communityData) return <CommunityNotFound />;
  return <Header communityData={communityData} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const communityDocRef = doc(
    firestore,
    "communities",
    context?.params?.communityid as string
  );

  const communityData = await getDoc(communityDocRef);

  return {
    props: {
      communityData: communityData.exists()
        ? JSON.parse(
            safeJsonStringify({ id: communityData.id, ...communityData.data() })
          )
        : null,
    },
  };
}

export default communityPage;
