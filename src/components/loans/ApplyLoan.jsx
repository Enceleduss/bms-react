import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { countries } from "@/api/countriesstates";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";
import { EducationLoanFields } from "./EducationLoanFields";
import { OtherLoanFields } from "./OtherLoansFields";
import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
//import Select from "rc-select";

import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import { Controller, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import "./ApplyLoan.css";
import { Flex, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    width: 180,
    minHeight: 35,
  }),
};

function ApplyLoan() {
  const roiObj = {
    "Home Loan": 8.35,
    "Education Loan": 9.45,
    "Personal Loan": 16.68,
  };
  const axios = useAxiosPrivate();
  const authObj = useSelector((store) => store.AUTH);
  const navigate = useNavigate();
  const {
    setValue,
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const onSubmit = async (values) => {
    try {
      const vals = {
        ...values,
        ["type"]: selectedOption === "Education Loan" ? "edu" : "oth",
        ["userid"]: authObj?.user,
        ["roi"]: roiObj[selectedOption],
      };
      const { data } = await axios.post("http://localhost:9046/add-loan", {
        ...vals,
      });

      if (data) {
        if (data.errors) {
          const {
            name,
            username,
            email,
            password,
            phone,
            dob,
            address,
            state,
            country,
          } = data.errors;
          if (name) generateError(name);
          else if (email) generateError(email);
          else if (password) generateError(password);
          else if (phone) generateError(phone);
          else if (dob) generateError(dob);
          else if (username) generateError(username);
          else if (address) generateError(address);
          else if (state) generateError(state);
          else if (country) generateError(country);
          navigate("/");
        } else {
          navigate("/my-loans");
        }
        navigate("/my-loans");
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
      return;
    }
    navigate("/my-loans");
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const [chosenLoanDate, setLoanDate] = useState();
  const [chosenTillDate, setTillDate] = useState();
  return (
    <div className="page">
      <div style={{ height: "100%", alignContent: "justify" }}>
        <h2>Apply for a loan</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
            width={378}
          >
            <div className="formInternalDiv">
              <label htmlFor="loanype">Loan Type</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="loantype"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "Loan Type is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={[
                        { value: "Personal Loan", label: "Personal Loan" },
                        { value: "Home Loan", label: "Home Loan" },
                        { value: "Education Loan", label: "Education Loan" },
                      ]}
                      value={value}
                      onChange={(val) => {
                        field.onChange(val.value);
                        handleChange(val.value);
                      }}
                    />
                  );
                }}
              />
              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  wordWrap: true,
                  height: 8,
                }}
              >
                {errors.loantype
                  ? errors.loantype.message
                  : "ROI: " + roiObj[selectedOption] + "%"}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="loanamount">Loan Amount</label>
              <input
                type="number"
                name="loanamount"
                placeholder="Loan Amount"
                {...register("loanamount", {
                  required: "Loan amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be non zero and positive",
                  },
                })}
              />
              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  wordWrap: true,
                  height: 8,
                }}
              >
                {errors.loanamount ? errors.loanamount.message : ""}
              </p>
            </div>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="loanapplydate">Loan Apply Date</label>
              <Controller
                control={control}
                width={170}
                defaultValue=""
                selected={chosenLoanDate}
                name="loanapplydate"
                onChange={() => alert("outer onchange")}
                rules={{ required: "Loan apply date is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <DatePicker
                      {...field}
                      dateFormat={"dd/MM/yyyy"}
                      minDate={new Date()}
                      width={170}
                      selected={chosenLoanDate}
                      ref={field.ref}
                      inputRef={field.ref}
                      onChange={(val) => {
                        setValue("loanapplydate", val.getMilliseconds());
                        setLoanDate(val);
                        trigger("loanapplydate");
                        //field.onChange();
                      }}
                    />
                  );
                }}
              />

              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  wordWrap: true,
                  height: 8,
                }}
              >
                {errors.loanapplydate ? errors.loanapplydate.message : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="duration">Duration</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="duration"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "Duration is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={[
                        { value: "5", label: "5 Years" },
                        { value: "10", label: "10 Years" },
                        { value: "15", label: "15 Years" },
                        { value: "20", label: "20 Years" },
                      ]}
                      value={value}
                      onChange={(val) => {
                        // alert("I am changed " + val.value);
                        field.onChange(val.value);
                      }}
                    />
                  );
                }}
              />
              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  wordWrap: true,
                  height: 8,
                }}
              >
                {errors.duration ? errors.duration.message : ""}
              </p>
            </div>
          </Flex>

          {selectedOption === "Education Loan" ? (
            <EducationLoanFields
              register={register}
              control={control}
              errors={errors}
            />
          ) : (
            <OtherLoanFields
              register={register}
              control={control}
              errors={errors}
            />
          )}
          <Button colorScheme="teal" variant="solid" type="submit">
            Apply
          </Button>
          <span>
            Back to details page <Link to="/user-details">click here</Link>
          </span>
        </form>
        <DevTool control={control} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default ApplyLoan;
