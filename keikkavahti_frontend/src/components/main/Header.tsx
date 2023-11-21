import React from "react";
import { Box, Heading, Text, BoxProps, TextProps } from "@chakra-ui/react";


interface HeaderProps extends BoxProps {
  HeaderBigText: string;
}

interface HeaderElementBigTextProps extends TextProps {
  HeaderBigText: string;
}

const HeaderBox: React.FC<BoxProps> = ({ children }) => {
  return (
    
    <Box
      as="section"
      bgGradient="linear(to-b, teal.700, gray.700)"
      pt="40px"
      pb="32px"
      px="32px"
      textAlign="center"
      
    >
      {children}
    </Box>
  );
};

export const HeaderElementBigText: React.FC<HeaderElementBigTextProps> = ({
  HeaderBigText,
}) => {
  return (
    <Heading textColor={"gray.100"} fontSize={["3xl", "3xl", "5xl"]}>
      {HeaderBigText}
    </Heading>
  );
};

const Header: React.FC<HeaderProps> = ({ HeaderBigText }) => {
  return (
    <HeaderBox>
      <HeaderElementBigText HeaderBigText={HeaderBigText}>
        {HeaderBigText}
      </HeaderElementBigText>
    </HeaderBox>
  );
};

export default Header;
