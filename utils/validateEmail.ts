import * as EmailValidator from "email-validator";

const validateEmail = (inp: string) => {
  if (inp === "") {
    return [true, "Email Required"];
  } else if (!EmailValidator.validate(inp)) {
    return [true, "Invalid Email"];
  }
  return [false, ""];
};

export default validateEmail;
