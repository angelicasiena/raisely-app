import React from "react";
import { Formik } from "formik";
import { signupService } from "../service/signup.service";
import { SignupMessage } from "../../types";
import { MessageBox } from "../../message/message";
import { Box, Input, Label } from "../../styled-tags/index";

export const SignupForm: React.FC = () => {
  const [messageData, setMessageData] = React.useState<SignupMessage | null>(
    null
  );
  return (
    <div>
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
            <Box>
              <Label>Firstname:</Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstname}
                name="firstname"
              />
              {props.errors.firstname && (
                <div id="feedback">{props.errors.firstname}</div>
              )}
            </Box>
            <Box>
              <Label>Lastname:</Label>
              <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastname}
                name="lastname"
              />
              {props.errors.lastname && (
                <div id="feedback">{props.errors.lastname}</div>
              )}
            </Box>
            <Box>
              <Label>Email:</Label>
              <Input
                type="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
              />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
            </Box>
            <Box>
              <Label>Password:</Label>
              <Input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </Box>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
