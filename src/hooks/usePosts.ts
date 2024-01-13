import { useState } from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { POSTS } from "../Constants/collection";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSelectPost = () => {};

  const onVote = async () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post?.imageURL) {
        const imageRef = ref(storage, `${POSTS}/${post.id}/image`);
        await deleteObject(imageRef);
      }
      const postRef = doc(firestore, POSTS, post.id);
      await deleteDoc(postRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts?.filter((_item) => _item?.id !== post?.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

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
