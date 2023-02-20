import { ButtonProps, Button } from "@chakra-ui/react";
import { MyGigAction } from "../../reducer";
import { deleteTag } from "../../services/GigServices";
import { MyGigState } from "../../types/MyGigs";
import { UserState } from "../../types/User";
import { isUntaggable } from "../../utils/UserUtils";

interface UntagButton extends ButtonProps {
  id: string;
  myGigDispatch: React.Dispatch<MyGigAction>;
  myGigs: MyGigState;
  user: UserState;
}

const untagGig = async (
  id: string,
  user: UserState,
  myGigDispatch: React.Dispatch<MyGigAction>
) => {
  const response = await deleteTag(user, id);
  if (response?.status === 200)
    myGigDispatch({ type: "UNTAG_GIG", payload: id });
};

export const UntagGigButton: React.FC<UntagButton> = ({
  id,
  user,
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
      display={isUntaggable(myGigs, id)}
      boxShadow={"0 5px 20px 0px rgb(255 255 255 / 43%)"}
      _hover={{ bg: "teal.600" }}
      _focus={{ outline: 0 }}
      fontSize={12}
      onClick={() => untagGig(id, user, myGigDispatch)}
    >
      Not interested
    </Button>
  );
};
