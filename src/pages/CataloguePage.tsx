import { useState } from "react";
import {
  Box,
  Text,
  Divider,
  Input,
  Flex,
  Button,
  useBoolean,
  Icon,
  Image,
  Wrap,
  FormControl,
  FormLabel,
  Center,
  HStack,
  useRadio,
  useRadioGroup,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  Checkbox,
} from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";
import MultiSelectTextInput from "../components/MultiSelectTextInpt";

export interface T extends File {
  preview: string;
}
export const CataloguePage = () => {
  const [files, setFiles] = useState<T[]>([]);
  const [isPreview, setIsPreview] = useBoolean();

  const listCategory: string[] = ["Collectibles", "Accessories", "T-Shirts"];
  const listCondition: string[] = ["Bad", "Fair", "Good", "New"];

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
        <Text pt={5} fontSize={"12px"} fontWeight={"light"}>
          {"You may upload up to 5 images (including thumbnail)"}
        </Text>
        <Text pt={1} fontSize={"12px"} fontWeight={"light"}>
          {"Support file types: jpeg, jpg, png"}
        </Text>
      </>
    );
  };
  const ImagePreviewComponent = () => {
    return (
      <Wrap>
        {files.length > 0 ? (
          files.map((file) => (
            <Image p={1} maxW={"150px"} src={file.preview} alt={file.name} />
          ))
        ) : (
          <Text pt={1} fontSize={"12px"} fontWeight={"light"}>
            No Image Uploaded
          </Text>
        )}
      </Wrap>
    );
  };

  const CustomRadioGroup = ({
    name,
    list,
  }: {
    name: string;
    list: string[];
  }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: name,
      defaultValue: list[list.length - 1],
      onChange: console.log,
    });

    const group = getRootProps();
    return (
      <>
        <FormLabel>{name}</FormLabel>
        <HStack {...group}>
          {list.map((item) => (
            <CustomRadio key={item} {...getRadioProps({ value: item })}>
              {item}
            </CustomRadio>
          ))}
        </HStack>
      </>
    );
  };
  const CustomRadio = (props: any) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          border={"1px"}
          borderColor={"gray.900"}
          _checked={{ color: "white", bg: "gray.900" }}
          pl={4}
          pr={4}
          pt={2}
          pb={2}
          fontWeight={"light"}
          fontSize={12}
        >
          {props.children}
        </Box>
      </Box>
    );
  };

  return (
    <Flex
      minH="100vh"
      maxW="100vw"
      justify={"center"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        flex={1}
        w={"100%"}
        align={"center"}
        direction={"column"}
        py={20}
        px={10}
      >
        <Flex direction={"row"} pb={10}>
          <Button
            size={"sm"}
            width={{ base: "150px", md: "220px" }}
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
      <Center h={{ base: "0", md: "85vh" }}>
        <Divider orientation="vertical" />
      </Center>

      <Flex
        flex={1}
        w={"100%"}
        px={10}
        py={{ base: "0", xl: "20" }}
        align={{ base: "center", xl: "flex-start" }}
        direction={"column"}
      >
        <FormControl isRequired={true} pb={5}>
          <FormLabel>Product Name</FormLabel>
          <Input
            placeholder="Name your listing. Keep it short and sweet"
            variant={"flushed"}
          />
        </FormControl>
        <Flex w="100%" direction={{ base: "column", xl: "row" }}>
          <FormControl
            flex={3}
            isRequired={true}
            pb={5}
            mr={{ base: 0, xl: 10 }}
          >
            <CustomRadioGroup name="Category" list={listCategory} />
          </FormControl>
          <FormControl flex={2} isRequired={true} pb={5}>
            <Flex justify={"flex-start"} direction={"column"}>
              <FormLabel>Thumbnail Image</FormLabel>
              <Button
                textColor={"gray.50"}
                bg={"gray.900"}
                borderRadius={"none"}
                maxW="200px"
                _hover={{
                  textColor: "gray.50",
                  bg: "gray.700",
                }}
              >
                <>
                  <Icon as={BiImageAdd} />
                  <Input
                    type="file"
                    width="200px"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    position="absolute"
                    top="0"
                    left="0"
                  />
                  <Text>Add Image</Text>
                </>
              </Button>
            </Flex>
          </FormControl>
        </Flex>

        <FormControl pb={5} alignItems={"start"} textAlign={"start"}>
          <FormLabel>{"Brand (Up to 2)"}</FormLabel>
          <MultiSelectTextInput />
        </FormControl>
        <FormControl isRequired={true} pb={5}>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Add more information about the product"
            variant={"flushed"}
            maxLength={200}
          />
          <FormHelperText textAlign={"end"}>200/200</FormHelperText>
        </FormControl>
        <FormControl
          isRequired={true}
          pb={5}
          alignItems={"start"}
          textAlign={"start"}
        >
          <FormLabel>Available Qty</FormLabel>
          <Input
            placeholder="Enter available quantity"
            variant={"flushed"}
            w="50%"
            type="number"
          />
        </FormControl>
        <FormControl isRequired={true} pb={5}>
          <CustomRadioGroup name="Condition" list={listCondition} />
        </FormControl>
        <Flex w={"100%"}>
          <FormControl pb={5} textAlign={"start"}>
            <FormLabel>Season</FormLabel>
            <Input placeholder="SS20" variant={"flushed"} w={"80%"} />
          </FormControl>
          <FormControl pb={5} textAlign={"start"}>
            <FormLabel>Retail</FormLabel>
            <InputGroup>
              <InputLeftElement children="S$" />
              <Input placeholder="400" variant={"flushed"} w={"80%"} />
            </InputGroup>
          </FormControl>
        </Flex>
        <FormControl pb={5} textAlign={"start"}>
          <FormLabel>Authencity</FormLabel>
          <Input value="100%" readOnly placeholder="400" variant={"unstyled"} />
        </FormControl>
        <FormControl isRequired={true} pb={5} textAlign={"start"}>
          <FormLabel>Declaration</FormLabel>
          <Checkbox
            size="lg"
            colorScheme="black"
            spacing="1rem"
            textAlign={"start"}
          >
            <Text fontSize={"14px"}>
              I hearby declare that my item is 100% authentic and in the
              original packaging. In the event that any information given in
              this application proves to be false or incorrect. I shall be
              responsible for the consequences.
            </Text>
          </Checkbox>
        </FormControl>
              <Flex w="100%" py={10} justify={{ base: "center", md: "flex-end" }}>
          <Button
            bg={"transparent"}
            color={"gray.900"}
            _hover={{
              bg: "blue.500",
            }}
            borderRadius={"none"}
            border={"1px solid"}
            borderColor={"gray.900"}
          >
            Cancel
          </Button>
          <Button
            ml={5}
            bg={"gray.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            borderRadius={"none"}
          >
            Publish
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
