import React, { useState } from "react";
import { connect } from 'react-redux';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

export const SignIn = ({ emailSignInStart, googleSignInStart }) => {

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const [formErrors, setFormErrors] = useState({
    errors: [],
  });

  const { errors } = formErrors;

  const [formLoading, setLoading] = useState({
    loading: false,
  });

  const { loading } = formLoading;

  const displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log(event);

    if (isFormValid(userCredentials)) {
      setFormErrors({ errors: [] });
      setLoading({ loading: true });
      emailSignInStart(email, password);
    }
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(userCredentials)) {
      error = { message: "Please fill in all of the fields to login to Ninja Chat" };
      setFormErrors({ errors: errors.concat(error) });
      return false;
    }
    else {
      return true;
    }
  };

  const isFormEmpty = ({ email, password }) => {
    return (
      !email.length ||
      !password.length
    );
  };

  const handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="black" textAlign="center">
          <Icon name="code" color="black" />
          Login to NinjaChat
        </Header>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={handleChange}
              value={email}
              className={handleInputError(errors, "email")}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              className={handleInputError(errors, "password")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              color="black"
              fluid
              size="large"
            >
              Submit
            </Button>

            <Button
              disabled={loading}
              className="googleSignIn"
              color="blue"
              fluid
              size="large"
              type="button"
              onClick={googleSignInStart}
            >
              Sign In With Google
            </Button>

          </Segment>
        </Form>
        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);