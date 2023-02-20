import { ButtonProps, Button } from "@chakra-ui/react";
import { MyGigAction } from "../../reducer";
import { tagGig } from "../../services/GigServices";
import { SimplifiedGig } from "../../types/Gigs";
import { MyGigState } from "../../types/MyGigs";
import { UserState } from "../../types/User";
import { isAttendingOrInterested } from "../../utils/UserUtils";

type Operation = "interested" | "attending";

export interface GigButton extends ButtonProps {
  buttonText: string;
  id: string;
  operation: Operation;
  user: UserState;
  date: string;
  venue: string;
  bands: string;
  myGigDispatch: React.Dispatch<MyGigAction>;
  myGigs: MyGigState;
}

const tagGigAndUpdateState = async (
  id: string,
  operation: Operation,
  user: UserState,
  myGigDispatch: React.Dispatch<MyGigAction>,
  date: string,
  venue: string,
  bands: string
) => {
  const response = await tagGig(id, operation, user);

  const payload: SimplifiedGig = {
    id: id,
    date: date,
    venue: venue,
    bands: bands,
    status: operation,
  };

  if (response?.status === 200 && operation === "interested") {
    myGigDispatch({ type: "TAG_INTERESTED", payload: payload });
  }

  if (response?.status === 200 && operation === "attending") {
    myGigDispatch({ type: "TAG_ATTENDING", payload: payload });
  }
};

export const GigActionButton: React.FC<GigButton> = ({
  buttonText,
  id,
  operation,
  user,
  date,
  venue,
  bands,
  myGigDispatch,
  myGigs,
}) => {
  return (
    <Button
      mt={6}
      w={"full"}
      bg={"teal.500"}
      color={"white"}
      rounded={"xl"}
      _active={{ color: "green.200" }}
      variant={"solid"}
      isDisabled={isAttendingOrInterested(myGigs, id, operation)}
      boxShadow={"0 5px 20px 0px rgb(255 255 255 / 43%)"}
      _hover={{ bg: "teal.600" }}
      _focus={{ outline: 0 }}
      fontSize={12}
      onClick={() =>
        tagGigAndUpdateState(
          id,
          operation,
          user,
          myGigDispatch,
          date,
          venue,
          bands
        )
      }
    >
      {buttonText}
    </Button>
  );
};
