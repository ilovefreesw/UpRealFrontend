const validateUsernameOrEmail = (inp: string) => {
  if (inp === "") {
    return [true, "Field Required"];
  } else if (inp.length < 4) {
    return [true, "Field must have at least 4 characters"];
  }
  return [false, ""];
};

export default validateUsernameOrEmail;
