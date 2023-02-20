import { Box, BoxProps } from "@chakra-ui/react";

export const FormBox: React.FC<BoxProps> = ({ children }) => {
  return (
    <Box
      className="formBox"
      p="50px"
      fontSize="18px"
      bg="gray.400"
      w="25%"
      minW={["75%", "75%", "25%"]}
      rounded={"xl"}
    >
      {children}
    </Box>
  );
};
