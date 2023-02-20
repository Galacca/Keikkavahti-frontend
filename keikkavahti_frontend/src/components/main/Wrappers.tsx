import { BoxProps, Box, Flex, FlexProps } from "@chakra-ui/react";

//Koko roska on wrapatty tähän. Sivusto oli muistaakseeni hieman responsiivisempi tällä border asetuksella
export const Wrapper: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    //mx = shorthand border left & right. 6 = 1.5rem, 24px
    <Box mx="6" {...props}>
      {children}
    </Box>
  );
};

export const LeftAndRightBoxWrapper: React.FC<BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      maxW="994px"
      margin="auto"
      mt="3px"
      borderRadius="12px"
      overflow="hidden"
      boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)"
      textAlign="center"
      {...props}
    >
      {children}
    </Box>
  );
};

export const LeftAndRightFlex: React.FC<FlexProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex textAlign="center" direction={["column", "column", "row"]} {...props}>
      {children}
    </Flex>
  );
};
