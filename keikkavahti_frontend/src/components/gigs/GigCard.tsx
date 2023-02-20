import {
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Link,
  Box,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import Gig from "../../types/Gigs";
import { isoDateToReadable } from "../../utils/DateUtils";
import { IsLoggedIn } from "../../utils/UserUtils";
import {
  conditionalButtonTextInterested,
  conditionalButtonTextAttending,
} from "./ConditionalButtonText";
import { GigActionButton } from "./GigButton";
import GigUpperBox from "./GigUpperBox";
import ShowLess from "./ShowLess";
import ShowMore from "./ShowMore";
import { UntagGigButton } from "./UntagGigButton";

const LazyLowerBox = React.lazy(() => import("./GigLowerBox"));

const GigCard: React.FC<Gig> = ({
  link,
  date,
  time,
  venue,
  bands,
  addinfo,
  id,
  user,
  myGigDispatch,
  myGigs,
}) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none" w={"xs"}>
        {({ isExpanded }) => (
          <Center py={6}>
            <GigUpperBox>
              <Stack textAlign={"center"} p={4} align={"center"}>
                <Text fontSize={"md"} fontWeight={500} p={1} rounded={"full"}>
                  {isoDateToReadable(date)}
                </Text>

                <Stack direction={"column"} align={"center"} justify={"center"}>
                  <Heading fontSize={"1xl"} fontWeight={800}>
                    {bands}
                  </Heading>
                  <Text>{venue}</Text>
                </Stack>
              </Stack>

              <AccordionButton
                w="100%"
                borderTop="1px"
                borderBottom="1px"
                bg={"teal.600"}
                _hover={{ bg: "teal.500" }}
              >
                {isExpanded ? <ShowLess /> : <ShowMore />}
              </AccordionButton>

              <AccordionPanel>
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLowerBox>
                    <List spacing={3}>
                      <ListItem>Showtime: {time.slice(0, -3)}</ListItem>
                      <ListItem>{addinfo}</ListItem>
                      <ListItem>
                        <Link color={"blue.600"} isExternal={true} href={link}>
                          {link}
                        </Link>
                      </ListItem>
                    </List>

                    {IsLoggedIn(user.user.name) ? (
                      <Box>
                        <GigActionButton
                          buttonText={conditionalButtonTextInterested(
                            myGigs,
                            id
                          )}
                          id={id}
                          operation="interested"
                          user={user}
                          date={date}
                          venue={venue}
                          bands={bands}
                          myGigDispatch={myGigDispatch}
                          myGigs={myGigs}
                        />
                        <GigActionButton
                          buttonText={conditionalButtonTextAttending(
                            myGigs,
                            id
                          )}
                          id={id}
                          operation="attending"
                          user={user}
                          date={date}
                          venue={venue}
                          bands={bands}
                          myGigDispatch={myGigDispatch}
                          myGigs={myGigs}
                        />
                        <UntagGigButton
                          id={id}
                          user={user}
                          myGigDispatch={myGigDispatch}
                          myGigs={myGigs}
                        />
                      </Box>
                    ) : (
                      <Box>
                        <Center>
                          <Text color={"teal.600"} mt={6}>
                            Log in for more functionality
                          </Text>
                        </Center>
                      </Box>
                    )}
                  </LazyLowerBox>
                </Suspense>
              </AccordionPanel>
            </GigUpperBox>
          </Center>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default GigCard;
