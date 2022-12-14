import React, { InputHTMLAttributes } from 'react'
import Header from '../components/main/Header';
import { VStack, FormControl, FormLabel, FormErrorMessage, Box, BoxProps, Input, Center } from '@chakra-ui/react';
import { useField, Formik, Field } from 'formik';
import BasicButton from '../components/main/ButtonBasic';
import { NavBar } from '../components/main/NavBar';
import { LoginSchema } from "../../../../keikkavahti_backend/src/schema/UserSchema"
import { login } from '../services/login';
import { useUserStateValue } from '../state';
import { UserAction } from '../reducer';
import { Navigate } from 'react-router-dom';
import { IsLoggedIn } from '../utils/UserUtils';

//TO DO: Chop the whole file up to smaller components

type FormValues = {
    username: string,
    password: string,
}

const initialValues = {
    username: "",
    password: "",
}


const validateTheForms = (values: FormValues) => {
    
    const validation = LoginSchema.safeParse(values)
    

    if (!validation.success) {

        // Here we change the Zod errors to a type that Formik can read
        const errorMap: Record<string, string> = {};
        validation.error.errors.map(e => errorMap[e.path.join()] = e.message)
        
        return errorMap;
        
    }
    
}

interface LoginFormProps {
    dispatch: React.Dispatch<UserAction>
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
}

export const InputField: React.FC<InputFieldProps> = ({label, size, ...props}) => {
    const [field, meta] = useField(props)
    
    return (
        <FormControl isInvalid={!!meta.error && meta.touched}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Field
            as={Input}
            id={field.name}
            name={field.name}
            variant="filled"
        />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

const LoginForm = (props: LoginFormProps) => {
    return (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, {setErrors}) => {

            const validationFailure = validateTheForms(values)

            if (validationFailure) {

                 setErrors(validationFailure)

            } else {

                const valuesAsJSON = JSON.stringify(values)
                const loginResult = await login(valuesAsJSON)
                
                //Nested if-statement is kinda bad, but I still think its better to not send anything to the backend if the frontend validation already fails

                if (loginResult?.field) {

                    const failedLogin: Record<string, string> = {[loginResult.field] : loginResult.message}
                    setErrors(failedLogin)

                } else if (loginResult?.name) {

                    window.localStorage.setItem(
                        'loggedInUser', JSON.stringify(loginResult)
                    ) 

                    props.dispatch({ type: "LOGGED_IN_USER", payload: loginResult });
                }

          }}}
        >
            {({ handleSubmit }) => (

            <form name='loginForm' onSubmit={handleSubmit}>
              <VStack spacing={8} align="flex-start" rounded={'full'}>
                    <InputField name='username' label='Username' />
                    <InputField name='password' type='password' label='Password' />
                    
                    <BasicButton type='submit' boxShadow={'none'}>Log in</BasicButton>
                    
              </VStack>
            </form>
          )}
        </Formik>
    )
}

export const FormBox: React.FC<BoxProps> = ({children}) => {
    return (
        <Box className="formBox" p='50px' fontSize='18px' bg='gray.400' w='25%' minW={['75%', '75%', '25%']} rounded={'xl'}>
            {children}
        </Box>
    )
}

 const Login = () => {

    const [user, dispatch] = useUserStateValue();


    //User is already logged in or just did so, send them elsewhere
    if (IsLoggedIn(user.user.name as string))
        return (
            <>
            <Navigate to='/'></Navigate>
            </>
        )

    return (
      <>
      <NavBar />
        <Box className="login" bg='gray.700' minH={'calc(100vh)'} h='100%'>
          <Header HeaderBigText='Log in' />
            <Center>
              <FormBox>
                  <LoginForm dispatch={dispatch} />
              </FormBox> 
            </Center>
        </Box>
      </>
    );

}
export default Login
