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

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: communityDataType;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

const communityState = atom<CommunityState>({
  key: "CommunitiesState",
  default: defaultCommunityState,
});

export default communityState;
