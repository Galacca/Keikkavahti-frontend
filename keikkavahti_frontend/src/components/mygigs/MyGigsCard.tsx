import { Text } from "@chakra-ui/react";
import { SimplifiedGig } from "../../types/Gigs";
import { isoDateToReadable } from "../../utils/DateUtils";

export const AttendingGigsCard: React.FC<SimplifiedGig> = ({
  date,
  venue,
  bands,
}) => {
  return (
    <>
      <Text fontWeight={400}>{isoDateToReadable(date)}</Text>
      <Text fontWeight={500} ml={4}>
        {bands}
      </Text>
      <Text mb={3} ml={4}>
        {venue}
      </Text>
    </>
  );
};

export const InterestedGigsCard: React.FC<SimplifiedGig> = ({
  date,
  venue,
  bands,
  id,
}) => {
  return (
    <>
      <Text fontWeight={400}>{isoDateToReadable(date)}</Text>
      <Text fontWeight={500} ml={4}>
        {bands}
      </Text>
      <Text mb={3} ml={4}>
        {venue}
      </Text>
    </>
  );
};
