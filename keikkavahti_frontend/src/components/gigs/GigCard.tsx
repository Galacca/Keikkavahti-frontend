import { Center, Text, Stack, List, ListItem, Button, Heading, Accordion, AccordionButton, AccordionItem, AccordionPanel, Link, ButtonProps, } from '@chakra-ui/react';
import { tagGig } from '../../services/GigServices';
import Gig from '../../types/Gigs';
import { UserState } from '../../types/User';
import { isoDateToReadable } from '../../utils/DateUtils';
import { IsLoggedIn } from '../../utils/UserUtils';
import GigLowerBox from './GigLowerBox';
import GigUpperBox from './GigUpperBox';
import ShowLess from './ShowLess';
import ShowMore from './ShowMore';

interface GigButton extends ButtonProps {

    buttonText: string
    id: string
    operation: string
    user: UserState

}

const GigActionButton: React.FC<GigButton> = ({buttonText, id, operation, user}) => {
    return (
    <Button 
        mt={6} w={'full'} bg={'teal.500'} color={'white'} rounded={'xl'}
        boxShadow={'0 5px 20px 0px rgb(255 255 255 / 43%)'} _hover={{ bg: 'teal.600', }} _focus={{ bg: 'teal.600', }}
        onClick={() => tagGig(id, operation, user)} isDisabled={!IsLoggedIn(user.user.name)}>
        {buttonText}
    </Button>
    )
}

const GigCard: React.FC<Gig> = ({ link, date, time, venue, bands, addinfo, id, user}) => {
   
return (
    <Accordion allowToggle>
        <AccordionItem border='none' w={'xs'} >
            {({ isExpanded }) => (
            <Center py={6}>
                <GigUpperBox >
                    <Stack textAlign={'center'} p={4} align={'center'}>

                        <Text fontSize={'md'} fontWeight={500} p={1} rounded={'full'}>
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

                            <GigActionButton buttonText='Im interested' id={id} operation='interested' user={user} />
                            <GigActionButton buttonText='Im attending' id={id} operation='attending' user={user} />

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