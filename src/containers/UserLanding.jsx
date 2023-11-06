import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthDetailsAction } from "@/store/auth/auth-slice";
import { calculateAge } from "@/utils/utils";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
//import { getCurrentUserDetail, isLoggedIn } from "../auth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { DepositModal } from "@/components/deposit/DepositModal";
export function Landing() {
  const [user, setUserDetails] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUserDetails = async () => {
      try {
        const response = await axiosPrivate.get("/user-details", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUserDetails(response.data);
      } catch (err) {
        console.error(err);
        dispatch(clearAuthDetailsAction());
      }
    };
    getUserDetails();
    //setInterval(getUserDetails, 2000);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Tbody>
            <Tr>
              <Td colSpan={4}>
                <Heading fontSize={"md"}>Personal Details</Heading>
              </Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Name</Td>
              <Td>{user.name}</Td>
              <Td color={"gray"}>User Name</Td>
              <Td>{user.username}</Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Email</Td>
              <Td>{user.email}</Td>
              <Td color={"gray"}>Phone</Td>
              <Td>{user.phone}</Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Identification Document</Td>
              <Td>{user.identificationtype}</Td>
              <Td color={"gray"}>Document No</Td>
              <Td>{user.docnum}</Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Address</Td>
              <Td>
                <div
                  style={{
                    wordBreak: "break-word",
                    width: "200px",
                    whiteSpace: "wrap",
                  }}
                >
                  {user.address}
                </div>
              </Td>
              <Td color={"gray"}>DOB</Td>
              <Td>{new Date(user.dob).toDateString()}</Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>State</Td>
              <Td>{user.state}</Td>
              <Td color={"gray"}>Country</Td>
              <Td>{user.country}</Td>
            </Tr>
            <Tr>
              <Td colSpan={4}>
                <Heading fontSize={"md"}>Account Details</Heading>
              </Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Account Type</Td>
              <Td>{user.acctype}</Td>
              <Td color={"gray"}>Branch Name</Td>
              <Td>{user.branchname}</Td>
            </Tr>
            <Tr>
              <Td color={"gray"}>Mode of Operation</Td>
              <Td>
                {calculateAge(user.dob) < 18
                  ? "Minor"
                  : calculateAge(user.dob) > 60
                  ? "Senior"
                  : "Normal"}
              </Td>
              <Td color={"gray"}>Balance (INR)</Td>
              <Td>{user.balance}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-evenly"}
        mt={10}
      >
        <>
          <DepositModal
            accType={user.acctype}
            currBal={user.balance}
            refreshUserDetails={setUserDetails}
          />
          <Button
            colorScheme="teal"
            h={9}
            variant="solid"
            onClick={() => {
              navigate("/apply-loan");
            }}
          >
            Apply Loan
          </Button>
        </>{" "}
      </Stack>
    </>
  );
}
export default Landing;
