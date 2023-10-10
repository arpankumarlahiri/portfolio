import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type privacyType = "public" | "private" | "restricted";
export type communityDataType = {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: privacyType;
  createdAt?: Timestamp;
  imageURL?: string;
};
