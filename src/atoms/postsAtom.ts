import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  userDisplayText: string; // change to authorDisplayText
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  embeddedLink?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

export type postVote = {
  id: string;
  postId: string;
  comminityId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  // Votes that user has given
  postVotes: PostVote[];
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
