import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { signUpStart } from '../../redux/user/user.actions';

export const SignUp = ({ signUpStart }) => {

  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { displayName, email, password, passwordConfirmation } = userCredentials;

  const [formErrors, setFormErrors] = useState({
    errors: [],
  });

  const { errors } = formErrors;

  const[formLoading, setLoading] = useState({
    loading: false,
  });

  const { loading } = formLoading;

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  const isFormValid = () => {
    let errors = [];
    let error;

    if (isFormEmpty(userCredentials)) {
      error = { message: "Please fill in all of the fields to sign up for Ninja Chat" };
      setFormErrors({ errors: errors.concat(error) });
      return false;
    } 
    else if (!isPasswordValid(userCredentials)) {
      error = { message: "Your password is invalid, please entered a valid password." };
      setFormErrors({ errors: errors.concat(error) });
      return false;
    } 
    else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !displayName.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } 
    else if (password !== passwordConfirmation) {
      return false;
    } 
    else {
      return true;
    }
  };

  const displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      setFormErrors({ errors: [] });
      setLoading({ loading: true });
      signUpStart({ displayName, email, password });
    }
  };

  const handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? true
      : false;
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="black" textAlign="center">
          <Icon name="code" color="black" />
          Register for NinjaChat
        </Header>
        { errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            { displayErrors(errors) }
          </Message>
        )}
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="displayName"
              icon="user"
              iconPosition="left"
              placeholder="Display Name"
              value={displayName}
              type="text"
              onChange={handleChange}
              error={handleInputError(errors, "name")}
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              value={email}
              type="email"
              onChange={handleChange}
              error={handleInputError(errors, "email")}
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              type="password"
              onChange={handleChange}
              error={handleInputError(errors, "password")}
            />

            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              value={passwordConfirmation}
              type="password"
              onChange={handleChange}
              error={handleInputError(errors, "password")}
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
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
};

const mapDispatchToProps = dispatch => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp)