import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  CardFooter,
  useDisclosure,
  Button,
  Input,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
export function LoanCard(loan) {
  return (
    <>
      <Card width={400}>
        <CardHeader>
          <Heading size="md"> {loan.loan.loantype}</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple" colorScheme="teal" fontSize={10}>
            <Tbody>
              <Tr>
                <Td color={"gray"}>Loan Amount</Td>
                <Td>{loan.loan.loanamount}</Td>
                <Td color={"gray"}>Date</Td>
                <Td>{new Date(loan.loan.loandate).getUTCDate()}</Td>
              </Tr>
              <Tr>
                <Td color={"gray"}>Loan Type</Td>
                <Td>{loan.loan.loantype}</Td>
                <Td color={"gray"}>Duration</Td>
                <Td>{loan.loan.duration} Years</Td>
              </Tr>
              <Tr>
                <Td color={"gray"}>Mother Name</Td>
                <Td>{loan.loan.motherName}</Td>
                <Td color={"gray"}>Annual Income</Td>
                <Td>{loan.loan.annualIncome}</Td>
              </Tr>
            </Tbody>
          </Table>

          <Text>{JSON.stringify(loan)}</Text>
        </CardBody>
      </Card>
    </>
  );
}
export default LoanCard;
