import { Box } from "@chakra-ui/react";
import { Header } from "./features/Header";
import LandingPage from "@/Pages/LandingPage";
import Login from "@/Pages/userLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegisterPage from "./Pages/userRegister";
import ApplyLoanPage from "./Pages/applyLoan";
import MyLoans from "./Pages/userLoans";
import UserHomePage from "./Pages/UserLandingPage";
import { PersistLogin } from "@/components/PersistLogin";

import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route
            exact
            path="/"
            element={
              <Box p={10}>
                <Header />
                <LandingPage />
              </Box>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/user-details"
            element={
              <Box p={10}>
                <Header />
                <UserHomePage />
              </Box>
            }
          />
          <Route
            exact
            path="/apply-loan"
            element={
              <Box p={10}>
                <Header />
                <ApplyLoanPage />
              </Box>
            }
          />
          <Route
            exact
            path="/my-loans"
            element={
              <Box p={10}>
                <Header />
                <MyLoans />
              </Box>
            }
          />
        </Route>
        <Route
          exact
          path="/register"
          element={
            <Box p={10}>
              <Header />
              <UserRegisterPage />
            </Box>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
