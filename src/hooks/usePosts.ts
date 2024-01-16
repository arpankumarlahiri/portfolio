import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Post, PostVote, postState } from "../atoms/postsAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { POSTS } from "../Constants/collection";
import authModalState from "../atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import communityState from "../atoms/communitiesAtoms";

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const communityStateValue = useRecoilValue(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSelectPost = () => {};

  const onVote = async (post: Post, vote: number, communityId: string) => {
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    const { voteStatus } = post;

    const existingVote = postStateValue.postVotes.find(
      (vote) => vote.postId === post.id
    );
    try {
      let voteChange = vote;
      const batch = writeBatch(firestore);

      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];

      // New vote
      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, "users", `${user.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // Used for both possible cases of batch writes
        const postVoteRef = doc(
          firestore,
          "users",
          `${user.uid}/postVotes/${existingVote.id}`
        );

        // Removing vote
        if (existingVote.voteValue === vote) {
          voteChange *= -1;
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          batch.delete(postVoteRef);
        }
        // Changing vote
        else {
          voteChange = 2 * vote;
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIdx = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          // Vote was found - findIndex returns -1 if not found
          if (voteIdx !== -1) {
            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            };
          }
          batch.update(postVoteRef, {
            voteValue: vote,
          });
        }
      }
      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      if (postIdx !== -1) {
        updatedPosts[postIdx!] = updatedPost;
      }

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      // Update database
      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();
    } catch (error) {
      console.log("voting error", error);
    }
  };

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

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  useEffect(() => {
    if (!user?.uid || !communityStateValue.currentCommunity) return;
    getCommunityPostVotes(communityStateValue.currentCommunity.id);
  }, [user, communityStateValue.currentCommunity]);

  useEffect(() => {
    // Logout or no authenticated user
    if (!user?.uid) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
      return;
    }
  }, [user]);

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
