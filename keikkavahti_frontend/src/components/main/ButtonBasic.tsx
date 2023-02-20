import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const BasicButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ChakraButton
    mt={10}
    w={"full"}
    bg={"teal.500"}
    color={"white"}
    rounded={"xl"}
    boxShadow={"0 5px 20px 0px rgb(255 255 255 / 43%)"}
    _hover={{ bg: "teal.600" }}
    _focus={{ bg: "teal.600" }}
    {...props}
  >
    {children}
  </ChakraButton>
);

export default BasicButton;
