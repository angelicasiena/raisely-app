import React from "react";
import { Formik } from "formik";
import { signupService } from "../service/signup.service";

type SignupResponse = {
  message: string;
  status: string;
};

export const SignupForm = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
      onSubmit={async (values, actions) => {
        signupService.submit(values).then(function (response) {
          response = response as SignupResponse;
          alert(response.message);
        });
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.firstname}
            name="firstname"
          />
          {props.errors.firstname && (
            <div id="feedback">{props.errors.firstname}</div>
          )}
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.lastname}
            name="lastname"
          />
          {props.errors.lastname && (
            <div id="feedback">{props.errors.lastname}</div>
          )}
          <input
            type="email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name="email"
          />
          {props.errors.email && <div id="feedback">{props.errors.email}</div>}
          <input
            type="password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            name="password"
          />
          {props.errors.password && (
            <div id="feedback">{props.errors.password}</div>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  </div>
);
