import {
    Badge,
    Box,
    chakra,
    filter,
    Text,
    Flex,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
    Tag,
    useRangeSlider,
    VStack,
    HStack,
  } from "@chakra-ui/react";

  import { useEffect, useState } from "react";
  
  type Props = {
    min: number;
    max: number;
    step: number;
    symbol: string;
    defaultValue: [number, number];
    "aria-label": [string, string];
    onChange: any;
  };
  
  const CustomSlider = ({ min, max, step, symbol, defaultValue, onChange}: Props) => {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
  
    const [sliderValue, setSliderValue] = useState(defaultValue);
  
    useEffect(() => {
            onChange(sliderValue);
    }, [sliderValue]);
  
    return (
        <HStack>  
          <Tag variant='outline' size='md' minWidth={'55px'} pr='5px'> {symbol == '$'? '$' + formatter.format(sliderValue[0]) :
                                              symbol == '%' ? formatter.format(sliderValue[0]) + '%' : formatter.format(sliderValue[0])
                                              } </Tag>
          <RangeSlider
            aria-label={["min", "max"]}
            w="100%"
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            onChange={(val) => {
              setSliderValue([val[0], val[1]]);
            }}
          >
            <RangeSliderTrack bg="blue.500">
              <RangeSliderFilledTrack bg="teal.500" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={3} index={0}>
              <Box color="teal.500" />
            </RangeSliderThumb>
            <RangeSliderThumb boxSize={3} index={1}>
              <Box color="teal.500" />
            </RangeSliderThumb>
          </RangeSlider>
          <Tag variant='outline' size='md' minWidth={'55px'} pl='5px'> {symbol == '$'? '$' + formatter.format(sliderValue[1]) :
                                              symbol == '%' ? formatter.format(sliderValue[1]) + '%' : formatter.format(sliderValue[1]) 
                                              } </Tag>
        </HStack>
    );
  };
  export default CustomSlider;