const validateName = (fieldName: string, inp: string) => {
  if (inp === "") {
    return [true, `${fieldName} Required`];
  }

  return [false, ""];
};

export default validateName;
