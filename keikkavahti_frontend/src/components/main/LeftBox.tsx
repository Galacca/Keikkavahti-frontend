import { BoxProps, Box } from "@chakra-ui/react";

export const LeftBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box bg="gray.500" {...props}>
      {children}
    </Box>
  );
};
