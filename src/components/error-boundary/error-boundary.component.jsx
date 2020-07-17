import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundLogo from '../../assets/404.png';
import { 
  ErrorImageOverlay, 
  ErrorImageContainer, 
  ErrorImageTitle, 
  ErrorImageText } from './error-boundary.styles';

/**
 * Allow us to catch errors by wrapping components into this component.
 */
class ErrorBoundary extends React.Component {

  constructor() {
    super();

    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    // Process the error.
    return { hasErrored: true }
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={PageNotFoundLogo} />
          <ErrorImageTitle>Our Dog Ate this Page</ErrorImageTitle>
          <ErrorImageText>Our dog is cute but honestly a menace. How are you supposed to chat with other ninjas? Hang on.... maybe you need to <Link to='/login'>login</Link>?</ErrorImageText>
        </ErrorImageOverlay>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;