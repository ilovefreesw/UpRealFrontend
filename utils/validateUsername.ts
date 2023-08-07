const validateUsername = (inp: string) => {
  if (inp === "") {
    return [true, "Username Required"];
  } else if (inp.length < 4) {
    return [true, "Username must have at least 4 characters"];
  }
  return [false, ""];
};

export default validateUsername;
