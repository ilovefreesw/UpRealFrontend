const validatePassword = (inp: string) => {
  if (inp === "") {
    return [true, "Password Required"];
  } else if (inp.length < 6) {
    return [true, "Password must have at least 6 characters"];
  }
  return [false, ""];
};

export default validatePassword;
