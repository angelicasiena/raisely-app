import React from "react";
import { Formik, Field } from "formik";
import * as EmailValidator from "email-validator";
import { signupService } from "../service/signup.service";
import { SignupMessage } from "../../types";
import { MessageBox } from "../../message/message";
import { Box, Button, Flex, Input, Label } from "../../styled-tags/index";

export const SignupForm: React.FC = () => {
  const [messageData, setMessageData] = React.useState<SignupMessage | null>(
    null
  );

  const validateEmail = async (email: string) => {
    const emailAlreadyExists = await signupService.emailChecker(email);
    if (!EmailValidator.validate(email)) {
      return "Invalid Email";
    } else if (emailAlreadyExists) {
      return "Email already exists";
    }
  };
  return (
    <Box width="300px" m="auto">
      <h1>Signup Form</h1>
      {messageData && (
        <MessageBox message={messageData.message} status={messageData.status} />
      )}
      <Formik
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          const emailAlreadyExists = await signupService.emailChecker(
            values.email
          );
          if (emailAlreadyExists.toLowerCase() === "ok") {
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
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Flex>
              <Label>Firstname:</Label>
              <Input
                type="text"
                onChange={props.handleChange}
                value={props.values.firstname}
                name="firstname"
                required
              />
              {props.errors.firstname && (
                <div id="feedback">{props.errors.firstname}</div>
              )}
            </Flex>
            <Flex>
              <Label>Lastname:</Label>
              <Input
                type="text"
                onChange={props.handleChange}
                value={props.values.lastname}
                name="lastname"
                required
              />
              {props.errors.lastname && (
                <div id="feedback">{props.errors.lastname}</div>
              )}
            </Flex>
            <Flex>
              <Label>Email:</Label>
              <Field
                type="email"
                onChange={props.handleChange}
                onBlur={() => props.validateField("email")}
                validate={() => {
                  if (props.values.email) {
                    return validateEmail(props.values.email);
                  }
                }}
                value={props.values.email}
                name="email"
                required
              />
              {props.errors.email && (
                <Box mt={2}>
                  <MessageBox message={props.errors.email} status="error" />
                </Box>
              )}
            </Flex>
            <Flex>
              <Label>Password:</Label>
              <Input
                type="password"
                onChange={props.handleChange}
                value={props.values.password}
                name="password"
                required
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </Flex>
            <Flex mt="25px">
              <Button
                bg="#2196F3"
                borderColor="#2196F3"
                color="#FFFFFF"
                type="submit"
              >
                SIGNUP
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  );
};
