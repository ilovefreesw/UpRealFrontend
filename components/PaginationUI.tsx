import { chakra, Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  pageNum: number;
  updatePage: Function;
  maxPages: number;
}

function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

const PaginationUI = ({ pageNum, updatePage, maxPages }: PaginationProps) => {
  const [pageStart, setPageStart] = useState(1);

  const PagButton = (props: any) => {
    const activeStyle = {
      bg: "teal.500",
      _dark: {
        bg: "brand.500",
      },
      color: "white",
    };

    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        color="gray.700"
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
        display={
          props.p &&
          !props.active && {
            base: "none",
            sm: "block",
          }
        }
        onClick={() => {
          if (!props.icon) {
            return;
          }

          if (props.left && pageNum - 1 > 0) {
            if (pageNum - 1 < pageStart) {
              setPageStart(pageStart - 3);
            }

            updatePage(pageNum - 1);
          }
          if (props.right && pageNum + 1 < maxPages) {
            if (pageNum + 1 > pageStart + 2) {
              setPageStart(pageStart + 3);
            }

            updatePage(pageNum + 1);
          }
        }}
      >
        {props.children}
      </chakra.button>
    );
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex>
        <PagButton icon left>
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>

        {range(3, pageStart).map((val, idx) => {
          return (
            <PagButton p key={idx} active={val == pageNum}>
              {val}
            </PagButton>
          );
        })}

        <PagButton icon right>
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  );
};

export default PaginationUI;
