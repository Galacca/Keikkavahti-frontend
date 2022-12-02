import React from "react";
import { Box, Heading, Text, BoxProps, TextProps} from "@chakra-ui/react";

//TypeScript interfaceja. Ei kuulu kurssiin. Ei tarvitse välittää.
interface HeaderProps extends BoxProps {
    HeaderBigText: string,
}

interface HeaderElementBigTextProps extends TextProps {
    HeaderBigText: string,
}

const HeaderBox: React.FC<BoxProps> = ({children}) => {
    return (
        //TextShadow ovela kikka (ei minun keksimä) jolla saadaan feikattua mustat reunukset tekstille
        <Box as='section'
            bgGradient='linear(to-b, teal.700, gray.700)'
            pt='40px'
            pb='32px'
            px='32px'
            textAlign='center'
            // textShadow="2px 0px #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
            // 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000"
            >
        {children}
        </Box>
    )
}

export const HeaderElementBigText: React.FC<HeaderElementBigTextProps> = ({HeaderBigText}) => {
    return (
        <Heading textColor={'gray.100'} fontSize={['3xl', '3xl', '5xl']}>
            {HeaderBigText}
        </Heading>
    )
}

const Header: React.FC<HeaderProps> = ({HeaderBigText}) => {
    return (
       <HeaderBox>
            <HeaderElementBigText HeaderBigText={HeaderBigText}>
                 {HeaderBigText}
            </HeaderElementBigText>
        </HeaderBox>
    );
}

export default Header

