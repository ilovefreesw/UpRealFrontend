const validateConfirmPassword = (inp1: string, inp: string) => {
  if (inp === "") {
    return [true, "Confirm Password Required"];
  } else if (inp1 != inp) {
    return [true, "Passwords must match"];
  }
  return [false, ""];
};

export default validateConfirmPassword;
