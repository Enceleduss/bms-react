import { useEffect } from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthDetailsAction } from "@/store/auth/auth-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import LoansCardDetails from "./LoansCardDetails";
import { SimpleGrid } from "@chakra-ui/react";
export function LoansCardView() {
  const [loans, setLoansDetails] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getLoansDetails = async () => {
      try {
        const response = await axiosPrivate.get("/get-loans", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setLoansDetails(response.data);
      } catch (err) {
        console.error(err);
        dispatch(clearAuthDetailsAction());
      }
    };
    getLoansDetails();
    //setInterval(getUserDetails, 2000);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {loans.length == 0 ? (
          <center>No Loans to display</center>
        ) : (
          loans.map((l, i) => <LoansCardDetails key={i} loan={l} />)
        )}
      </SimpleGrid>
    </>
  );
}
export default LoansCardView;
