import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { POSTS } from "../../Constants/collection";
import { communityDataType } from "../../atoms/communitiesAtoms";
import { auth, firestore } from "../../firebase/clientApp";
import usePosts from "../../hooks/usePosts";
import { Post } from "../../atoms/postsAtom";
import { Stack } from "@chakra-ui/react";
import PostItem from "./PostItem";
import PostLoader from "./Loader";
import { useAuthState } from "react-firebase-hooks/auth";

type PostsProps = {
  communityData?: communityDataType;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const { postStateValue, setPostStateValue, onVote, onDeletePost } =
    usePosts();

  const onSelectPost = () => {};

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, POSTS),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post) => (
            <PostItem
              key={post.id}
              post={post}
              // postIdx={index}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find((item) => item.postId === post.id)
                  ?.voteValue
              }
              userIsCreator={user?.uid === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
