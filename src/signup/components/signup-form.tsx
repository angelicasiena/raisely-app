import React from "react";
import { Formik, Form, Field } from "formik";
import * as EmailValidator from "email-validator";
import { signupService } from "../service/signup.service";
import { SignupMessage } from "../../types";
import { MessageBox } from "../../message/message";
import { Box, SubmitButton, Flex, Input, Label } from "../../styled-tags/index";

export const SignupForm: React.FC = () => {
  const [messageData, setMessageData] = React.useState<SignupMessage | null>(
    null
  );

  const emailAlreadyExists = async (email: string) => {
    const emailCheckerResponse = await signupService.emailChecker(email);
    return emailCheckerResponse?.toLowerCase() !== "ok";
  };

  const validateEmail = async (email: string) => {
    const isExisting = await emailAlreadyExists(email);
    if (!EmailValidator.validate(email)) {
      return "Invalid Email";
    } else {
      return isExisting ? "Email already exists" : null;
    }
  };
  return (
    <Box width="300px" m="auto">
      <h1>Signup Form</h1>
      {messageData && (
        <MessageBox message={messageData.message} status={messageData.status} />
      )}
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          const isExisting = await emailAlreadyExists(values.email);
          if (!isExisting) {
            signupService.submit(values).then(function (response) {
              setMessageData(response);
            });
          } else {
            setMessageData({
              message:
                "This email address has already been registered. Have you tried logging in?",
              status: "error",
            });
          }

          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          validateField,
          handleSubmit,
          handleChange,
          errors,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Flex>
              <Label>Firstname:</Label>
              <Field
                as={Input}
                type="text"
                value={values.firstname}
                name="firstname"
                required
              />
              {errors.firstname && (
                <Box mt={2}>
                  <MessageBox message={errors.firstname} status="error" />
                </Box>
              )}
            </Flex>
            <Flex>
              <Label>Lastname:</Label>
              <Field
                as={Input}
                type="text"
                value={values.lastname}
                name="lastname"
                required
              />
              {errors.lastname && (
                <Box mt={2}>
                  <MessageBox message={errors.lastname} status="error" />
                </Box>
              )}
            </Flex>
            <Flex>
              <Label>Email:</Label>
              <Field
                as={Input}
                type="email"
                onBlur={(event: React.FocusEvent<any>) => {
                  validateField("email");
                }}
                validate={() => {
                  if (values.email) {
                    return validateEmail(values.email);
                  }
                }}
                value={values.email}
                name="email"
                required
              />
              {errors.email && (
                <Box mt={2}>
                  <MessageBox message={errors.email} status="error" />
                </Box>
              )}
            </Flex>
            <Flex>
              <Label>Password:</Label>
              <Field
                as={Input}
                type="password"
                value={values.password}
                name="password"
                required
              />
              {errors.password && (
                <Box mt={2}>
                  <MessageBox message={errors.password} status="error" />
                </Box>
              )}
            </Flex>
            <Flex mt="25px">
              <SubmitButton
                bg="#2196F3"
                borderColor="#2196F3"
                color="#FFFFFF"
                type="submit"
                disabled={isSubmitting}
              >
                SIGNUP
              </SubmitButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
