import { Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type EmbedLinkUploadProps = {
  embeddedLink?: string;
  onAdded: (_embeddedLink?: string) => boolean;
};

const EmbedLinkUpload: React.FC<EmbedLinkUploadProps> = ({
  embeddedLink: embeddedLinkDefault,
  onAdded,
}) => {
  const [error, setError] = useState(false);

  const [embeddedLink, setEmbeddedLink] = React.useState<string | undefined>(
    embeddedLinkDefault
  );

  const isAdded = embeddedLinkDefault && embeddedLinkDefault === embeddedLink;
  const onEmbeddedLinkChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmbeddedLink(target.value);
  };

  return (
    <Stack spacing={3} width="100%">
      <Text>Enter Link:</Text>
      <HStack>
        <Input
          name="Link"
          value={embeddedLink}
          onChange={(event) => {
            setError(false);
            onEmbeddedLinkChange(event);
          }}
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
          fontSize="10pt"
          borderRadius={4}
          placeholder="Link"
        />
        <Button
          height="34px"
          variant={isAdded ? "outline" : "solid"}
          padding="0px 30px"
          disabled={!embeddedLink}
          onClick={() => {
            if (isAdded) {
              setEmbeddedLink(undefined);
            }
            if (onAdded(isAdded ? undefined : embeddedLink)) {
              setError(false);
            } else {
              setError(true);
            }
          }}
        >
          {isAdded ? "Remove X" : "Add"}
        </Button>
      </HStack>
      {!!error && !!embeddedLink && (
        <Text textAlign="left" mt={2} mb={2} fontSize="10pt" color="red">
          Please enter a correct link
        </Text>
      )}
    </Stack>
  );
};
export default EmbedLinkUpload;
