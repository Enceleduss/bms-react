import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { countries } from "@/api/countriesstates";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";

import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
//import Select from "rc-select";

import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import { Controller, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Register.css";
import { Flex, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    width: 200,
    minHeight: 35,
  }),
};

function Register() {
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
      const { data } = await axios.post("http://localhost:9046/register", {
        ...values,
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
          navigate("/");
        }
        navigate("/");
      }
    } catch (error) {
      if (error.code == "ERR_BAD_REQUEST") alert("User name exists already");
      else alert(error.message);
      console.log(error);
      return;
    }
    alert("User added successfully. You will be redirected to login page now.");
    navigate("/");
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (value) => {
    setSelectedOption(value);
  };
  const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      return;
      if (cookies.jwt) {
        navigate("/home");
      } else {
        navigate("/register");
      }
    };
    verifyUser();
  }, [cookies, navigate]);
  const [chosenDOB, setDOB] = useState();
  return (
    <div className="page">
      <div style={{ height: "100%", alignContent: "center" }}>
        <h2>Register Account {JSON.stringify(chosenDOB)}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Cannot exceed more than 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Only alphabets and spaces are allowed",
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
                {errors.name ? errors.name.message : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                placeholder="User Name"
                {...register("username", {
                  required: "User name is required",
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
                {errors.username ? errors.username.message : ""}
              </p>
            </div>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 0, md: 0 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Must be more than 4 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Cannot exceed 16 characters",
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
                {errors.password ? errors.password.message : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                {...register("confirmpassword", {
                  required: "Password is required",
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
                {errors.confirmpassword ? errors.confirmpassword.message : ""}
              </p>
            </div>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="dob">Date of Birth</label>
              <Controller
                control={control}
                defaultValue=""
                selected={chosenDOB}
                name="dob"
                onChange={() => alert("outer onchange")}
                rules={{ required: "DOB is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <DatePicker
                      {...field}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat={"dd/MM/yyyy"}
                      selected={chosenDOB}
                      ref={field.ref}
                      inputRef={field.ref}
                      onChange={(val) => {
                        alert("changed to " + val.getTime());
                        setValue("dob", val.getTime());
                        setDOB(val.getTime());
                        trigger("dob");
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
                {errors.dob ? errors.dob.message : ""}
              </p>
            </div>
            <div className="formInternalDiv">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 10,
                    message: "Cannot be less than 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Cannot exceed more than 10 characters",
                  },
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Enter valid phone",
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
                {errors.phone ? errors.phone.message : ""}
              </p>
            </div>
          </Flex>

          <div className="formInternalDiv">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter valid email",
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
              {errors.email ? errors.email.message : ""}
            </p>
          </div>
          <div className="formInternalDiv">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              name="address"
              placeholder="Address"
              {...register("address", {
                required: "Address is required",
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
              {errors.address ? errors.address.message : ""}
            </p>
          </div>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="state">State</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="state"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "State is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={countries.map((obj) => {
                        return { value: obj.name, label: obj.name };
                      })}
                      value={countries
                        .map((obj) => {
                          return { value: obj.name, label: obj.name };
                        })
                        .find((c) => c.value === value)}
                      onChange={(val) => {
                        //alert("I am changed " + val.value);
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
                {errors.state ? errors.state.message : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="country">Country</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="country"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "Country is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={countries.map((obj) => {
                        return { value: obj.name, label: obj.name };
                      })}
                      value={countries
                        .map((obj) => {
                          return { value: obj.name, label: obj.name };
                        })
                        .find((c) => c.value === value)}
                      onChange={(val) => {
                        //alert("I am changed " + val.value);
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
                {errors.country ? errors.country.message : ""}
              </p>
            </div>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="acctype">Account Type</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="acctype"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "Account Type is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={[
                        { value: "Savings", label: "Savings" },
                        { value: "Salary", label: "Salary" },
                      ]}
                      value={countries
                        .map((obj) => {
                          return { value: obj.name, label: obj.name };
                        })
                        .find((c) => c.value === value)}
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
                {errors.acctype ? errors.acctype.message : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="branchname">Branch Name</label>
              <Controller
                control={control}
                defaultValue=""
                value=""
                name="branchname"
                styles={customStyles}
                onChange={() => alert("outer onchange")}
                rules={{ required: "Branch Name is required" }}
                render={({ field, value, name, ref }) => {
                  return (
                    <Select
                      {...field}
                      ref={field.ref}
                      inputRef={field.ref}
                      styles={customStyles}
                      options={[
                        { value: "Delhi", label: "Delhi" },
                        { value: "Mumbai", label: "Mumbai" },
                        { value: "Chandigarh", label: "Chandigarh" },
                      ]}
                      value={countries
                        .map((obj) => {
                          return { value: obj.name, label: obj.name };
                        })
                        .find((c) => c.value === value)}
                      onChange={(val) => {
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
                {errors.branchname ? errors.branchname.message : ""}
              </p>
            </div>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            mt={{ base: 1, md: 1 }}
          >
            <div className="formInternalDiv">
              <label htmlFor="identificationtype">Identification Type</label>
              <input
                type="text"
                name="identificationtype"
                placeholder="Identification Type"
                {...register("identificationtype", {
                  required: "Identification Type is required",
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
                {errors.identificationtype
                  ? errors.identificationtype.message
                  : ""}
              </p>
            </div>

            <div className="formInternalDiv">
              <label htmlFor="docnum">Document No.</label>
              <input
                type="text"
                name="docnum"
                placeholder="Document No."
                {...register("docnum", {
                  required: "Document No. is required",
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
                {errors.docnum ? errors.docnum.message : ""}
              </p>
            </div>
          </Flex>
          <div className="formInternalDiv">
            <label htmlFor="initialdeposit">Initial Deposit Amount (INR)</label>
            <input
              type="number"
              name="initialdeposit"
              placeholder="Initial Deposit"
              {...register("initialdeposit", {
                required: "Initial Deposit is required",
                valueAsNumber: true,
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
              {errors.initialdeposit ? errors.initialdeposit.message : ""}
            </p>
          </div>
          <Button colorScheme="teal" variant="solid" type="submit">
            Submit
          </Button>
          <span>
            Already have an account ? <Link to="/">Login</Link>
          </span>
        </form>
        <DevTool control={control} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
