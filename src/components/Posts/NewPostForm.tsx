import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { firestore, storage } from "../../firebase/clientApp";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import TabItems from "./TabItems";
import { POSTS } from "../../Constants/collection";
import useSelectFile from "../../hooks/useSelectFile";
import EmbedLinkUpload from "./PostForm/EmbedLinkUpload";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Image",
    icon: IoImageOutline,
  },
  {
    title: "Embed",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const [embeddedLink, setEmbeddedLink] = React.useState<string | undefined>();

  const { selectedFile, setSelectedFile, onSelectImage } = useSelectFile();
  const router = useRouter();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    setLoading(true);
    setError(false);
    const { title, body } = textInputs;
    const { communityid } = router.query;
    try {
      const postDocRef = await addDoc(collection(firestore, POSTS), {
        communityId: communityid,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        userDisplayText: user.email!.split("@")[0],
        title,
        body,
        numberOfComments: 0,
        embeddedLink,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });

      // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `${POSTS}/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      router.back();
    } catch (error) {
      console.log("createPost error", error);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAddClick = (_embeddedLink?: string) => {
    if (!_embeddedLink) {
      setEmbeddedLink(undefined);
      return false;
    }
    const urlPattern =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (urlPattern.test(_embeddedLink)) {
      setEmbeddedLink(_embeddedLink);
      setSelectedTab("Post");
      return true;
    } else {
      return false;
    }
  };

  return (
    <Flex direction={"column"} mt={2} bg={"white"} borderRadius={4}>
      <Flex width={"100%"}>
        {formTabs.map((_items) => (
          <TabItems
            key={_items.title}
            item={_items}
            selected={selectedTab === _items.title}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Image" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
          />
        )}
        {selectedTab === "Embed" && (
          <EmbedLinkUpload embeddedLink={embeddedLink} onAdded={onAddClick} />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
