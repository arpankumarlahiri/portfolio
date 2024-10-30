import React, { Stack } from "@chakra-ui/react";
import CreatePostLink from "../components/Community/CreatePostLink";
import PageContentLayout from "../components/Layout/PageContentLayout";
import PostItem from "../components/Posts/PostItem";
import { useEffect } from "react";
import PostLoader from "../components/Posts/Loader";
import usePosts from "../hooks/usePosts";
import { Post, PostVote } from "../atoms/postsAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { POSTS, USERS } from "../Constants/collection";
import useCommunityData from "../hooks/useCommunityData";
import Recommendations from "../components/Community/Recommendations";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import { GetServerSideProps } from "next";
import HeadTag from "../components/Generics/HeadTag";

export default function Home({ posts }: { posts: Post[] }) {
  const [user, loadingUser] = useAuthState(auth);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
  } = usePosts();

  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, POSTS),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (communityStateValue?.mySnippets?.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error: any) {
      console.log("getUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    const postIds = postStateValue.posts.map((post) => post.id);
    const postVotesQuery = query(
      collection(firestore, `${USERS}/${user?.uid}/postVotes`),
      where("postId", "in", postIds)
    );
    const postVotesDoc = await getDocs(postVotesQuery);
    const postVotes = postVotesDoc.docs.map((_doc) => ({
      id: _doc.id,
      ..._doc.data(),
    }));

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  useEffect(() => {
    if (communityStateValue?.snippetsFetched) {
      buildUserHomeFeed();
    }
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) {
      getUserPostVotes();
    }
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [postStateValue.posts, user?.uid]);

  return (
    <>
      <HeadTag posts={posts} />
      <PageContentLayout>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {(postStateValue.posts ?? posts).map((post: Post, index) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === post.id
                    )?.voteValue
                  }
                  userIsCreator={user?.uid === post.creatorId}
                  onSelectPost={onSelectPost}
                  homePage
                />
              ))}
            </Stack>
          )}
        </>
        <Stack spacing={5}>
          <Recommendations />
          <Premium />
          <PersonalHome />
        </Stack>
      </PageContentLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const postQuery = query(
      collection(firestore, POSTS),
      orderBy("voteStatus", "desc"),
      limit(10)
    );
    const postDocs = await getDocs(postQuery);
    const posts = postDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || 0,
      editedAt: doc.data().editedAt?.toMillis() || 0,
    }));
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
