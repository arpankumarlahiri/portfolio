import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";
import {
  COMMUNITIES,
  COMMUNITYSNIPPET,
  USERS,
} from "../../../Constants/collection";
import { useAuthState } from "react-firebase-hooks/auth";
import { privacyType } from "../../../atoms/communitiesAtoms";

const characterLimit = 21;

type CreateCommunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = React.useState("");
  const [communityType, setCommunityType] =
    React.useState<privacyType>("public");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleClose() {
    onClose();
    setCommunityName("");
    setCommunityType("public");
    setError("");
    setLoading(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > characterLimit) return;
    setCommunityName(event.target.value);
  }

  function handleCommunityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(event.target.name as privacyType);
  }

  async function handleCreateCommunity() {
    if (error) setError("");
    const invalidRegex = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;

    if (communityName.length < 3 || invalidRegex.test(communityName)) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    try {
      setLoading(true);

      const communityRef = doc(firestore, COMMUNITIES, communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken. Try another.`);
        }
        transaction.set(communityRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(
            firestore,
            `${USERS}/${user?.uid}/${COMMUNITYSNIPPET}`,
            communityName
          ),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });

      setLoading(false);
      handleClose();
    } catch (error: any) {
      console.log("handleCreateCommunity Error", { error });
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDir={"column"}
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <ModalCloseButton />
          <Box pl={3} pr={3}>
            <Divider />
            <ModalBody display={"flex"} flexDir={"column"} padding={"10px 0px"}>
              <Text fontSize={15} fontWeight={600}>
                Name
              </Text>
              <Text fontSize={11} color={"gray.500"}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position={"relative"}
                width={"20px"}
                top={"28px"}
                left={"10px"}
                color={"gray.400"}
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size={"sm"}
                pl={"22px"}
                onChange={handleChange}
              />
              <Text
                fontSize={"9pt"}
                color={
                  characterLimit === communityName.length ? "red" : "gray.500"
                }
              >
                {characterLimit - communityName.length} Characters remaining
              </Text>
              {error && (
                <Text fontSize={"9pt"} color={"red"} pt={1}>
                  {error}
                </Text>
              )}
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>
                <Stack>
                  <Checkbox
                    onChange={handleCommunityChange}
                    isChecked={communityType === "public"}
                    name="public"
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} color={"gray.500"} mr={2} />
                      <Text fontSize={"10pt"} mr={1}>
                        Public
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Anyone can view, post and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={handleCommunityChange}
                    isChecked={communityType === "restricted"}
                    name="restricted"
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillPersonFill} color={"gray.500"} mr={2} />
                      <Text fontSize={"10pt"} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Anyone can view this community, but only approved user
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={handleCommunityChange}
                    isChecked={communityType === "private"}
                    name="private"
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} color={"gray.500"} mr={2} />
                      <Text fontSize={"10pt"} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Only approved user can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg={"gray.100"} borderRadius={"0px 0px 10px 10px"}>
            <Button
              variant={"outline"}
              height={"30px"}
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height={"30px"}
              onClick={handleCreateCommunity}
              isLoading={loading}
              isDisabled={communityName?.length < 3}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
