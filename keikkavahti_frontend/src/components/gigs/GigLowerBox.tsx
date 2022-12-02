import { Box, BoxProps } from "@chakra-ui/react";

const GigLowerBox: React.FC<BoxProps> = ({children}) => 
<Box bg={'gray.400'} px={6} py={10} rounded={'md'} overflow={'hidden'} >
    {children}
</Box>

export default GigLowerBox