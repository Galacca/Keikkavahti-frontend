import { InputHTMLAttributes } from "react";
import { useField, Formik, Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const isPasswordField = (name: string) => {
  if (name === "password") return "password";

  return "text";
};

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Field
        as={Input}
        id={field.name}
        name={field.name}
        variant="filled"
        type={isPasswordField(field.name)}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
