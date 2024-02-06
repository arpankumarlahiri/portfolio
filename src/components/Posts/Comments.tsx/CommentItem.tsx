import { Timestamp } from "firebase/firestore";

export type CommentType = {
  id?: string;
  creatorId: string;
  creatorDisplayText: string;
  creatorPhotoURL: string | null;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt?: Timestamp;
};
