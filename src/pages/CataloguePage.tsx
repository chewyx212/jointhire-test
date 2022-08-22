import { RefObject, useRef, useState } from "react";
import {
  Box,
  Text,
  Link,
  Code,
  Flex,
  Button,
  useBoolean,
  Icon,
  Image,
  Wrap,
} from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";
export interface T extends File {
  preview: string;
}
export const CataloguePage = () => {
  const [files, setFiles] = useState<T[]>([]);
  const [isPreview, setIsPreview] = useBoolean();

  const ImageGalleryComponent = () => {
      return (
        <>
      <Dropzone
        disabled={files.length === 5}
        maxFiles={5}
        accept={{
          "image/*": [],
        }}
        onDrop={<T extends File>(acceptedFiles: T[]) => {
          if (files.length + acceptedFiles.length <= 5) {
            setFiles((prevState) => {
              let newState = acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              );
              return [...newState, ...prevState];
            });
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Flex
            border={"1px solid black"}
            w={"100%"}
            h={{ base: "150px", sm: "300px", md: "400px" }}
            as="div"
            justify={"center"}
            align={"center"}
            direction={"column"}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon as={BiImageAdd} fontSize={"40px"} />
            <Text fontSize={"16px"}>Add Image</Text>
          </Flex>
        )}
              </Dropzone>
              <Text>{"You may upload up to 5 images (including thumbnail)"}</Text>
              <Text>{"Support file types: jpeg, jpg, png"}</Text>
              </>
    );
  };
  const ImagePreviewComponent = () => {
    return (
      <Wrap>
        {files.map((file) => (
          <Image
                p={1}
                maxW={'150px'}
            src={file.preview}
            alt={file.name}
            // onLoad={() => {
            //   URL.revokeObjectURL(file.preview);
            // }}
          />
        ))}
      </Wrap>
    );
  };
  return (
    <Box textAlign="center" fontSize="xl">
      <Flex
        minH="100vh"
        p={3}
        justify={"center"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex flex={1} align={"center"} direction={"column"} p={20}>
          <Flex direction={"row"} mb={10}>
            <Button
              size={"sm"}
              width={"220px"}
              variant={"unstyled"}
              fontWeight={isPreview ? "light" : "bold"}
              borderRadius={"none"}
              borderBottomWidth={isPreview ? 1 : 2}
              borderBottomColor={isPreview ? "gray.100" : "gray.900"}
              onClick={setIsPreview.off}
            >
              Image Gallery
            </Button>
            <Button
              size={"sm"}
              width={"220px"}
              variant={"unstyled"}
              fontWeight={isPreview ? "bold" : "light"}
              borderRadius={"none"}
              borderBottomWidth={isPreview ? 2 : 1}
              borderBottomColor={isPreview ? "gray.900" : "gray.100"}
              onClick={setIsPreview.on}
            >
              Preview
            </Button>
          </Flex>
          {isPreview ? <ImagePreviewComponent /> : <ImageGalleryComponent />}
        </Flex>
        <Flex flex={1} justify={"center"} direction={"column"}>
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            This is catalogue page
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
