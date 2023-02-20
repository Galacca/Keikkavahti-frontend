import {
  LoginSchema,
  SignUpSchema,
} from "../../../../../keikkavahti_backend/src/schema/UserSchema";

type FormValues = {
  username: string;
  password: string;
  user?: string;
};

export const validateTheForms = (values: FormValues, operation: string) => {
  let validation;

  if (operation === "login") {
    validation = LoginSchema.safeParse(values);
  } else {
    validation = SignUpSchema.safeParse(values);
  }

  if (!validation.success) {
    // Here we change the Zod errors to a type that Formik can read
    const errorMap: Record<string, string> = {};
    validation.error.errors.map((e) => (errorMap[e.path.join()] = e.message));

    return errorMap;
  }
};
