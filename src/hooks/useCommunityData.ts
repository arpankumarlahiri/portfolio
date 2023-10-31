import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import communityState, {
  CommunitySnippet,
  communityDataType,
} from "../atoms/communitiesAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { COMMUNITYSNIPPET, USERS } from "../Constants/collection";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user] = useAuthState(auth);

  const onJoinCommunity = (communityData: communityDataType) => {};
  const onLeaveCommunity = (communityID: string) => {};

  const onJoinOrLeaveCommunity = (
    communityData: communityDataType,
    isjoined: boolean
  ) => {
    if (isjoined) onJoinCommunity(communityData);
    else onLeaveCommunity(communityData.id);
  };

  const getMySnippets = async () => {
    setLoading(true);
    setError("");
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `${USERS}/${user?.uid}/${COMMUNITYSNIPPET}`)
      );
      const snippets = snippetDocs.docs.map((_docs) => ({ ..._docs.data() }));
      setCommunityStateValue((_prev) => ({
        ..._prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) getMySnippets();
  }, [user]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
