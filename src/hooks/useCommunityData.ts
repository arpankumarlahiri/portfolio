import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import communityState, {
  CommunitySnippet,
  communityDataType,
} from "../atoms/communitiesAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { COMMUNITIES, COMMUNITYSNIPPET, USERS } from "../Constants/collection";
import authModalState from "../atoms/authModalAtom";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const setAuthModal = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user] = useAuthState(auth);

  const onJoinCommunity = async (communityData: communityDataType) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData?.imageURL ?? "",
      };

      batch.set(
        doc(
          firestore,
          `${USERS}/${user?.uid}/${COMMUNITYSNIPPET}`,
          communityData.id
        ),
        newSnippet
      );

      batch.update(doc(firestore, `${COMMUNITIES}`, communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => {
        return {
          ...prev,
          mySnippets: [...prev.mySnippets, newSnippet],
        };
      });
    } catch (error: any) {
      console.log("onJoinCommunity Error", { error });
      setError(error.message);
    }
    setLoading(false);
  };

  const onLeaveCommunity = async (communityID: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, `${USERS}/${user?.uid}/${COMMUNITYSNIPPET}`, communityID)
      );

      batch.update(doc(firestore, `${COMMUNITIES}`, communityID), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => {
        return {
          ...prev,
          mySnippets: prev.mySnippets.filter(
            (_snippets) => _snippets.communityId !== communityID
          ),
        };
      });
    } catch (error: any) {
      console.log("onJoinCommunity Error", { error });
      setError(error.message);
    }
    setLoading(false);
  };

  const onJoinOrLeaveCommunity = (
    communityData: communityDataType,
    isjoined: boolean
  ) => {
    if (!user) {
      setAuthModal({ open: true, view: "login" });
      return;
    }
    if (isjoined) onLeaveCommunity(communityData.id);
    else onJoinCommunity(communityData);
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
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
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
