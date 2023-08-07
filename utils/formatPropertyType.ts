const formatPropertyType = (type: string) => {
  if (type == "land") {
    return "Land";
  }

  let parts = type.split("_");

  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

  return parts.join(" ");
};

export default formatPropertyType;
