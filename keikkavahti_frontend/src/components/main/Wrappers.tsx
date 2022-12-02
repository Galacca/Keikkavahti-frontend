import { BoxProps, Box, Flex, FlexProps } from "@chakra-ui/react"

//Koko roska on wrapatty tähän. Sivusto oli muistaakseeni hieman responsiivisempi tällä border asetuksella
export const Wrapper: React.FC<BoxProps> = ({children, ...props}) => {
    return (
        //mx = shorthand border left & right. 6 = 1.5rem, 24px
        <Box mx='6' {...props}>
            {children}
        </Box>
    )
}

//Tämä loota pitää sisällään molemmat boksit: uutiset (vasen) ja tuotteet (oikea) pääsivulla esimerkiksi
export const LeftAndRightBoxWrapper: React.FC<BoxProps> = ({children, ...props}) => {
    return (
        //maxW shorthand maxWidthille, mt shorthand margin topille, borderRadius tekee pyöreät kulmat, overflow estää valumasta muiden elementtien päälle, boxshadow luo varjon
        <Box  maxW='994px'
        margin='auto'
        mt='3px'
        borderRadius='12px'
        overflow='hidden'
        boxShadow='0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
        textAlign='center'
        {...props}
        >

         {children}

        </Box>
    )
}

//Flex joka asemoi elementit yllämainitun sisällä
export const LeftAndRightFlex: React.FC<FlexProps> = ({children, ...props}) => {
    return (
        // Direction array menee pienimmästä suurimpaan.
        // Eli: kännykän näyttö, ipad näyttö, desktop näyttö noin karkeasti
        // Muuttaa siis flexin suuntaa laitteen resoluutiosta riippuen

        <Flex textAlign='center' direction={['column', 'column', 'row']} {...props}>
            {children}
        </Flex>
    )
}
