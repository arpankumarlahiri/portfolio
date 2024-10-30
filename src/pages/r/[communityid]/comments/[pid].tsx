import React, { useEffect, useState } from "react";
import PageContentLayout from "../../../../components/Layout/PageContentLayout";
import PostItem from "../../../../components/Posts/PostItem";
import usePosts from "../../../../hooks/usePosts";
import { auth, firestore } from "../../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { POSTS } from "../../../../Constants/collection";
import { useSetRecoilState } from "recoil";
import { Post, postState } from "../../../../atoms/postsAtom";
import { useRouter } from "next/router";
import useCommunityData from "../../../../hooks/useCommunityData";
import About from "../../../../components/Community/About";
import Comment from "../../../../components/Posts/Comments.tsx";
import { GetServerSidePropsContext } from "next";
import HeadTag from "../../../../components/Generics/HeadTag";

type PostPageProps = {
  post?: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { postStateValue, onDeletePost, onVote } = usePosts();
  const setPostStateValue = useSetRecoilState(postState);
  const { communityStateValue } = useCommunityData();

  const fetchPost = async (pid: string) => {
    setLoading(true);
    try {
      const postDocRef = doc(firestore, POSTS, pid as string);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const { pid } = router.query;
    if (post) {
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: post,
      }));
    } else if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost, post]);

  if (postStateValue?.selectedPost) {
    return (
      <>
        <HeadTag posts={post ? [post] : []} />
        <PageContentLayout>
          <>
            <PostItem
              post={postStateValue.selectedPost}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={
                postStateValue.postVotes.find(
                  (item) => item.postId === postStateValue?.selectedPost?.id
                )?.voteValue
              }
              userIsCreator={
                user?.uid === postStateValue.selectedPost.creatorId
              }
            />
            <Comment
              user={user}
              communityId={postStateValue.selectedPost.communityId as string}
              selectedPost={postStateValue.selectedPost}
            />
          </>
          <>
            {!!communityStateValue?.currentCommunity && (
              <About communityData={communityStateValue?.currentCommunity} />
            )}
          </>
        </PageContentLayout>
      </>
    );
  }

  return null;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const postId = context.query.pid;
    const postDocRef = doc(firestore, POSTS, postId as string);
    const postDoc = await getDoc(postDocRef);
    return {
      props: {
        post: postDoc.exists()
          ? ({
              id: postDoc.id,
              ...postDoc.data(),
              createdAt: postDoc.data().createdAt?.toDate().toISOString(),
              editedAt:
                postDoc.data().editedAt?.toDate()?.toISOString() || null,
            } as unknown as Post)
          : undefined,
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
  }
  return {
    props: {
      post: undefined,
    },
  };
};
export default PostPage;
