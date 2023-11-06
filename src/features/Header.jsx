"use client";
import { Flex, HStack, Image, Link } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  Box,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logoImg from "@/assets/images/bank-logo.png";
import { setCompNameAction } from "@/store/landing/landingComp-slice";
import { setAuthDetailsAction } from "@/store/auth/auth-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "@/api/axios";
export function Nav() {
  return (
    <Flex justify={"space-between"}>
      <Image src={logoImg} h={10} />
      <HStack>
        <Link
          href={
            "mailto:codiku.dev@gmail.com?subject=Contacting you from your portfolio"
          }
          fontWeight={"bold"}
          fontSize={"lg"}
        >
          Hire me
        </Link>
      </HStack>
    </Flex>
  );
}
export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const authObj = useSelector((store) => store.AUTH);
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
          <Image src={logoImg} h={20} />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!authObj?.user ? (
                <>
                  <Button
                    _hover={{ bg: "lightgray" }}
                    colorScheme="ghost"
                    color={"blue.600"}
                    h={9}
                    variant="solid"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                  <Button
                    colorScheme="teal"
                    h={9}
                    variant="solid"
                    onClick={() => {
                      navigate("/");
                      dispatch(setCompNameAction("Login"));
                    }}
                  >
                    Login
                  </Button>
                </>
              ) : (
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
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{authObj?.user}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      My Details
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        navigate("/my-loans");
                      }}
                    >
                      My Loans
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        const cnf = window.confirm(
                          "Are you sure you want to logout?"
                        );
                        if (cnf) {
                          dispatch(
                            setAuthDetailsAction({
                              user: "",
                              roles: [],
                              accessToken: "",
                            })
                          );
                          axiosPrivate.post("/signout", "");
                          navigate("/");
                        }
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
