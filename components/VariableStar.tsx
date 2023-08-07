import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const HalfStarContainer = styled(Box)(({ percentage }: any) => ({
  display: "inline-flex",
  position: "relative",
  svg: {
    width: "1em", // Adjust the width of the SVG if needed
  },
  "& svg:nth-child(1)": {
    clipPath: `polygon(0 0, ${
      100 - percentage
    }% 0, ${percentage}% 100%, 0 100%)`,
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
  },
  "& svg:nth-child(2)": {
    position: "relative",
    top: 0,
    left: 0,
  },
}));
