import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Logo } from './Logo';
import { useLocation } from 'react-router-dom';

interface NavlinkType {
  display: string;
  link: string;
}
const Links: NavlinkType[] = [
  { display: "EVENTS", link: "/" },
  { display: "FEATURES", link: "/" },
  { display: "COMMUNITY", link: "/" },
  { display: "CATALOGUE", link: "/catalogue" },
];

const NavLink = ({ children,link,current }: { children: ReactNode,link: string, current: string }) => (
  <Link
    px={5}
    py={1}
    rounded={'md'}
    fontSize={'sm'}
    fontWeight={link==current ?'bold' : 'lioght'}
    textColor={useColorModeValue('gray.50', 'gray.50')}
    _hover={{
      textDecoration: 'none',
    textColor:useColorModeValue('gray.900', 'gray.900'),
      bg: useColorModeValue('gray.50', 'gray.50'),
    }}
    href={link}>
    {children}
  </Link>
);

export default function TopNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  return (
    <>
      <Box bg={useColorModeValue("gray.900", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            bg={"none"}
            color={"gray.50"}
            _hover={{
              textColor: useColorModeValue("gray.900", "gray.900"),
              bg: useColorModeValue("gray.50", "gray.50"),
            }}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Logo h="35px" pointerEvents="none" />
            <HStack
              as={"nav"}
              ml={20}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink
                  key={link.display}
                  link={link.link}
                  current={location.pathname}
                >
                  {link.display}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.display}
                  link={link.link}
                  current={location.pathname}
                >
                  {link.display}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}