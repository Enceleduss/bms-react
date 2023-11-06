import { Flex } from "@chakra-ui/react";
export function OtherLoanFields(props) {
  return (
    <>
      <div className="formInternalDiv">
        <label htmlFor="companyname">Company Name</label>
        <input
          type="text"
          name="email"
          placeholder="Company Name"
          {...props.register("companyname", {
            required: "Company name is required",
            maxLength: {
              value: 40,
              message: "Cannot exceed more than 40 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]*$/,
              message: "Only alphabets and spaces and numbers are allowed",
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
          {props.errors.companyname ? props.errors.companyname.message : ""}
        </p>
      </div>
      <div className="formInternalDiv">
        <label htmlFor="address">Address</label>
        <textarea
          type="text"
          name="address"
          placeholder="Address"
          {...props.register("address", {
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
          {props.errors.address ? props.errors.address.message : ""}
        </p>
      </div>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mt={{ base: 1, md: 1 }}
      >
        <div className="formInternalDiv">
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            {...props.register("designation", {
              required: "Designation is required",
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
            {props.errors.designation ? props.errors.designation.message : ""}
          </p>
        </div>

        <div className="formInternalDiv">
          <label htmlFor="annualincome">Annual Income</label>
          <input
            type="number"
            name="annualincome"
            placeholder="Annual Income"
            {...props.register("annualincome", {
              required: "Annual Income is required",
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
            {props.errors.annualincome ? props.errors.annualincome.message : ""}
          </p>
        </div>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mt={{ base: 1, md: 1 }}
      >
        <div className="formInternalDiv">
          <label htmlFor="totalexp">Total Experience</label>
          <input
            type="text"
            name="totalexp"
            placeholder="Total Experience"
            {...props.register("totalexp", {
              required: "Total Experience is required",
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
            {props.errors.totalexp ? props.errors.totalexp.message : ""}
          </p>
        </div>

        <div className="formInternalDiv">
          <label htmlFor="currexp">Current Experience</label>
          <input
            type="text"
            name="currexp"
            placeholder="Current Experience"
            {...props.register("currexp", {
              required: "Current Experience is required",
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
            {props.errors.currexp ? props.errors.currexp.message : ""}
          </p>
        </div>
      </Flex>
    </>
  );
}
export default OtherLoanFields;
