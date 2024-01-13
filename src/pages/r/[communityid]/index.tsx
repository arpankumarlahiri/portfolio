import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import communityState, {
  communityDataType,
} from "../../../atoms/communitiesAtoms";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import Header from "../../../components/Community/Header";
import PageContentLayout from "../../../components/Layout/PageContentLayout";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Community/About";

type communityPageProps = {
  communityData: communityDataType | null;
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {
  const setCommunityStateData = useSetRecoilState(communityState);

  useEffect(() => {
    if (communityData) {
      setCommunityStateData((prev) => ({
        ...prev,
        currentCommunity: communityData,
      }));
    }
  }, [communityData?.id]);

  if (!communityData) return <CommunityNotFound />;
  return (
    <>
      <Header communityData={communityData} />
      <PageContentLayout>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>

        <About communityData={communityData} />
      </PageContentLayout>
    </>
  );
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

export default CommunityPage;
