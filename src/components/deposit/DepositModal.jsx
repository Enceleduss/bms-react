import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";
import Select from "react-select";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
export const DepositModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const axios = useAxiosPrivate();
  const [accType1, setAccType] = useState(props.accType);
  const [deposit, setDeposit] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    setAccType(props.accType);
  }, [props.accType]);
  useEffect(() => {
    console.log("accType updated " + accType1);
  }, [accType1]);
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 40,
      width: 180,
      minHeight: 40,
    }),
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    //alert("submitted " + accType1 + " deposit " + deposit);
    try {
      const user = await axiosPrivate.put(
        "http://localhost:9046/make-deposit",
        {
          acctype: accType1,
          deposit: deposit,
        }
      );
      props.refreshUserDetails(user.data);
      onClose();
    } catch (error) {
      alert(error.message + "hellooooooooooooooooooooooooo");
      console.log(error);
      return;
    }
  };
  return (
    <>
      <Button colorScheme="blue" h={9} variant="solid" onClick={onOpen}>
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make a Deposit </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent={"space-evenly"}
                mt={{ base: 1, md: 1 }}
              >
                <div className="formInternalDiv">
                  <label htmlFor="acctype">Account Type</label>
                  <Select
                    {...props}
                    name="acctype"
                    styles={customStyles}
                    options={[
                      { value: "Savings", label: "Savings" },
                      { value: "Salary", label: "Salary" },
                    ]}
                    defaultValue={{
                      value: props.accType,
                      label: props.accType,
                    }}
                    onChange={(val) => {
                      setAccType(val.value);
                    }}
                  />
                </div>
                <div className="formInternalDiv">
                  <label htmlFor="amount">Deposit Amount</label>
                  <Input
                    type="text"
                    width={180}
                    name="amount"
                    placeholder="Amount"
                    onChange={(e) => {
                      //alert("changed " + e.target.value);
                      setDeposit(e.target.value);
                    }}
                  />
                </div>
              </Flex>
              <ModalFooter>
                <Button colorScheme="blue" mr={2} onClick={onClose}>
                  Cancel
                </Button>
                <Button type={"submit"} colorScheme="blue">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DepositModal;
