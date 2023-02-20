import React from "react";
import Header from "../components/main/Header";
import { VStack, Box, Center } from "@chakra-ui/react";
import { Formik } from "formik";
import BasicButton from "../components/main/ButtonBasic";
import { NavBar } from "../components/main/NavBar";
import { loginApiCall } from "../services/LoginService";
import { useUserStateValue } from "../state";
import { UserAction } from "../reducer";
import { Navigate } from "react-router-dom";
import { IsLoggedIn } from "../utils/UserUtils";
import { InputField } from "../components/forms/InputField";
import { validateTheForms } from "../components/forms/Validation";
import { FormBox } from "../components/forms/FormBox";

const initialValues = {
  username: "",
  password: "",
};

interface LoginFormProps {
  dispatch: React.Dispatch<UserAction>;
}

const LoginForm = (props: LoginFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const validationFailure = validateTheForms(values, "login");

        if (validationFailure) {
          setErrors(validationFailure);
        } else {
          const valuesAsJSON = JSON.stringify(values);
          const loginResult = await loginApiCall(valuesAsJSON);

          //Nested if-statement is kinda bad, but I still think its better to not send anything to the backend if the frontend validation already fails

          if (loginResult?.field) {
            const failedLogin: Record<string, string> = {
              [loginResult.field]: loginResult.message,
            };
            setErrors(failedLogin);
          } else if (loginResult?.name) {
            window.localStorage.setItem(
              "loggedInUser",
              JSON.stringify(loginResult)
            );

            props.dispatch({ type: "LOGGED_IN_USER", payload: loginResult });
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <form name="loginForm" onSubmit={handleSubmit}>
          <VStack spacing={8} align="flex-start" rounded={"full"}>
            <InputField name="username" label="Username" />
            <InputField name="password" type="password" label="Password" />

            <BasicButton type="submit" boxShadow={"none"}>
              Log in
            </BasicButton>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

const Login = () => {
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
        <Header HeaderBigText="Log in" />
        <Center>
          <FormBox>
            <LoginForm dispatch={dispatch} />
          </FormBox>
        </Center>
      </Box>
    </>
  );
};
export default Login;
