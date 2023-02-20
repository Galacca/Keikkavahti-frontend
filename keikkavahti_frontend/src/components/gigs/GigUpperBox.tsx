import { Box, BoxProps } from "@chakra-ui/react";

const GigUpperBox: React.FC<BoxProps> = ({ children }) => (
  <Box
    maxW={"330px"}
    w={"full"}
    bg={"gray.500"}
    rounded={"md"}
    overflow={"hidden"}
  >
    {children}
  </Box>
);

export default GigUpperBox;
