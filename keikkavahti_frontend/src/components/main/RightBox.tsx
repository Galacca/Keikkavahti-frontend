import { Box, BoxProps } from "@chakra-ui/react"

export const RightBox: React.FC<BoxProps> = ({children}) => {
    return (
        <Box p='50px' fontSize='18px' bg='white' >
            {children}
        </Box>
    )
}