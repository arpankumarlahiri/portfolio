import { useState } from "react";
import { useRecoilState } from "recoil";
import { postState } from "../atoms/postsAtom";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSelectPost = () => {};

  const onVote = async () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
    onVote,
    error,
  };
};

export default usePosts;
