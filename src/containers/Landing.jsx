import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import bannerImg from "@/assets/images/banner.png";
import { useSelector } from "react-redux";
import Login from "@/Pages/userLogin";
import Register from "@/Pages/userRegister";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Landing() {
  const navigate = useNavigate();
  const authObj = useSelector((store) => store.AUTH);
  //const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    // return;
    const verifyUser = async () => {
      if (authObj.accessToken) {
        navigate("/user-details");
      }
    };
    verifyUser();
  }, [authObj, navigate]);
  let leftSection = (
    <Box>
      <Heading
        fontSize={{ base: "2xl", md: "4xl", xl: "7xl" }}
        color="secondary"
      >
        Bank Management System
      </Heading>
      <Text fontSize="lg" color="secondary">
        This is{" "}
        <Text as="span">a basic banking application with features like;</Text>{" "}
        <br />{" "}
        <Text fontWeight={"bold"}>customer registration, deposits, Loans</Text>
      </Text>
    </Box>
  );
  const compName = useSelector((store) => store.LANDING_COMP.compName);
  switch (compName) {
    case "Login":
      leftSection = (
        <Box>
          <Login />
        </Box>
      );
      break;
    case "Register":
      leftSection = (
        <Box>
          <Register />
        </Box>
      );
      break;
    default:
      break;
  }
  const rightSection = (
    <>
      <Image src={bannerImg} w={600} h={400} />
    </>
  );
  return (
    <>
      <Box p={0}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-evenly"
          mt={{ base: 10, md: 10 }}
        >
          {leftSection}
          {rightSection}
        </Flex>
      </Box>
    </>
  );
}
export default Landing;
