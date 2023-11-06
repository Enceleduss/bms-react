import React, { Fragment } from "react";
import ApplyLoan from "@/components/loans/ApplyLoan";
import { Center } from "@chakra-ui/react";

function applyLoan() {
  return (
    <Center mt={5}>
      <ApplyLoan />
    </Center>
  );
}

export default applyLoan;
