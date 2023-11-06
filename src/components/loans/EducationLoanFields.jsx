import { Flex } from "@chakra-ui/react";
export function EducationLoanFields(props) {
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mt={{ base: 1, md: 1 }}
      >
        <div className="formInternalDiv">
          <label htmlFor="coursename">Course Name</label>
          <input
            type="text"
            name="coursename"
            placeholder="Course Name"
            {...props.register("coursename", {
              required: "Course name is required",
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
            {props.errors.coursename ? props.errors.coursename.message : ""}
          </p>
        </div>

        <div className="formInternalDiv">
          <label htmlFor="coursefee">Course Fee</label>
          <input
            type="number"
            name="coursefee"
            placeholder="Course Fee"
            {...props.register("coursefee", {
              required: "Course fee is required",
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
            {props.errors.coursefee ? props.errors.coursefee.message : ""}
          </p>
        </div>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mt={{ base: 1, md: 1 }}
      >
        <div className="formInternalDiv">
          <label htmlFor="fathername">Father Name</label>
          <input
            type="text"
            name="fathername"
            placeholder="Father Name"
            {...props.register("fathername", {
              required: "Father name is required",
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
            {props.errors.fathername ? props.errors.fathername.message : ""}
          </p>
        </div>

        <div className="formInternalDiv">
          <label htmlFor="fatheroccup">Father Occupation</label>
          <input
            type="text"
            name="fatheroccup"
            placeholder="Father Occupation"
            {...props.register("fatheroccup", {
              required: "Father Occupation is required",
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
            {props.errors.fatheroccup ? props.errors.fatheroccup.message : ""}
          </p>
        </div>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mt={{ base: 1, md: 1 }}
      >
        <div className="formInternalDiv">
          <label htmlFor="mother">Mother Name</label>
          <input
            type="text"
            name="mothername"
            placeholder="Mother Name"
            {...props.register("mothername", {
              required: "Mother name is required",
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
            {props.errors.mothername ? props.errors.mothername.message : ""}
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
    </>
  );
}
export default EducationLoanFields;
