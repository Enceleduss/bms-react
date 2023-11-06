import React, { Fragment } from "react";
import LoansCardView from "../components/loans/LoansCardView";
import "react-toastify/dist/ReactToastify.css";
function userLoans() {
  return (
    <Fragment>
      <LoansCardView />
    </Fragment>
  );
}

export default userLoans;
