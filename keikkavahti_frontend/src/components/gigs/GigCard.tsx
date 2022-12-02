import { Center, Text, Stack, List, ListItem, Button, Heading, Accordion, AccordionButton, AccordionItem, AccordionPanel, Link, } from '@chakra-ui/react';
import Gig from '../../types/Gigs';
import { isoDateToReadable } from '../../utils/DateUtils';
import GigLowerBox from './GigLowerBox';
import GigUpperBox from './GigUpperBox';
import ShowLess from './ShowLess';
import ShowMore from './ShowMore';


const GigCard: React.FC<Gig> = ({ link, date, time, venue, bands, addinfo}) => {
   
return (
    <Accordion allowToggle>
        <AccordionItem border='none'>
            {({ isExpanded }) => (
            <Center py={6}>
                <GigUpperBox>
                    <Stack textAlign={'center'} p={4} align={'center'}>

                        <Text fontSize={'md'} fontWeight={500} p={1} color={'aqua.700'} rounded={'full'}>
                            {isoDateToReadable(date)}
                        </Text>

                        <Stack direction={'column'} align={'center'} justify={'center'}>
                            <Heading fontSize={'1xl'} fontWeight={800}>
                                {bands}
                            </Heading>
                            <Text>
                                {venue}
                            </Text>
                        </Stack>

                    </Stack>

                    <AccordionButton w='100%' borderTop='1px' borderBottom='1px' bg={'teal.600'} _hover={{ bg: 'teal.500', }} >

                        {isExpanded ? (
                            <ShowLess />
                        ) : (
                            <ShowMore />
                        )}

                    </AccordionButton>
                    
                    <AccordionPanel>
                        <GigLowerBox >
                            <List spacing={3}>
                                <ListItem>
                                    Showtime: {time.slice(0, -3)}
                                </ListItem>
                                <ListItem>
                                    {addinfo}
                                </ListItem>
                                <ListItem>
                                    <Link color={'blue.600'} isExternal={true} href={link}>{link}</Link>
                                </ListItem>
                            </List>

                            <Button mt={10} w={'full'} bg={'teal.500'} color={'white'} rounded={'xl'}
                                    boxShadow={'0 5px 20px 0px rgb(255 255 255 / 43%)'} _hover={{ bg: 'teal.600', }} _focus={{ bg: 'teal.600', }}>
                                Actions
                            </Button>

                        </GigLowerBox>
                    </AccordionPanel>
                </GigUpperBox>
            </Center>
            )}
        </AccordionItem>
    </Accordion>
);
}

export default GigCard