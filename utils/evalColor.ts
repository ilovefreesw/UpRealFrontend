export const evalColor = (score: number) => {
  let color = "gray.300";

  if (score >= 4) {
    color = "green.300"; // Set the color to green for rentScore >= 4
  } else if (score >= 3) {
    color = "yellow"; // Set the color to yellow for rentScore >= 3
  } else if (score >= 2) {
    color = "orange"; // Set the color to orange for rentScore >= 2
  } else {
    color = "red"; // Set the color to red for rentScore < 2
  }

  return color;
};
