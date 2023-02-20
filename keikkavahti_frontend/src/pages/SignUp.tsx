import React from "react";
import Header from "../components/main/Header";
import { VStack, Box, Center, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import BasicButton from "../components/main/ButtonBasic";
import { NavBar } from "../components/main/NavBar";
import { useUserStateValue } from "../state";
import { UserAction } from "../reducer";
import { Navigate } from "react-router-dom";
import { IsLoggedIn } from "../utils/UserUtils";
import { InputField } from "../components/forms/InputField";
import { validateTheForms } from "../components/forms/Validation";
import { FormBox } from "../components/forms/FormBox";
import { signUpApiCall } from "../services/SignUpService";

const initialValues = {
  username: "",
  password: "",
  name: "",
};
interface SignUpFormProps {
  dispatch: React.Dispatch<UserAction>;
}

const SignUpForm = (props: SignUpFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const validationFailure = validateTheForms(values, "signup");

        if (validationFailure) {
          setErrors(validationFailure);
        } else {
          const valuesAsJSON = JSON.stringify(values);
          const signUpResult = await signUpApiCall(valuesAsJSON);

          //Nested if-statement is kinda bad, but I still think its better to not send anything to the backend if the frontend validation already fails

          if (signUpResult?.field) {
            const failedSignUp: Record<string, string> = {
              [signUpResult.field]: signUpResult.message,
            };
            setErrors(failedSignUp);
          } else if (signUpResult?.name) {
            window.localStorage.setItem(
              "loggedInUser",
              JSON.stringify(signUpResult)
            );

            props.dispatch({ type: "LOGGED_IN_USER", payload: signUpResult });
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <form name="loginForm" onSubmit={handleSubmit}>
          <VStack spacing={8} align="flex-start" rounded={"full"}>
            <InputField name="username" label="Username" />
            <InputField name="password" type="password" label="Password" />
            <InputField name="name" label="Name/handle" />
            <Text>
              Note that the name/handle is what will be visible to your friends.
              Not your username.
            </Text>
            <BasicButton type="submit" boxShadow={"none"}>
              Sign up
            </BasicButton>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

const signUp = () => {
  const [user, dispatch] = useUserStateValue();

  //User is already logged in or just did so, send them elsewhere
  if (IsLoggedIn(user.user.name as string))
    return (
      <>
        <Navigate to="/"></Navigate>
      </>
    );

  return (
    <>
      <NavBar />
      <Box className="login" bg="gray.700" minH={"calc(100vh)"} h="100%">
        <Header HeaderBigText="Sign up" />
        <Center>
          <FormBox>
            <SignUpForm dispatch={dispatch} />
          </FormBox>
        </Center>
      </Box>
    </>
  );
};
export default signUp;
