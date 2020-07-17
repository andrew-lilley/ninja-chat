import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dimmer, Loader } from 'semantic-ui-react'
import { selectCurrentUser } from '../redux/user/user.selectors';
import { checkUserSession } from '../redux/user/user.actions';
import ErrorBoundary from './error-boundary/error-boundary.component';
import "semantic-ui-css/semantic.min.css";
import './App.css';

const ChatPage = lazy(() =>
  import('../pages/chat/chat.component')
);

const SignIn = lazy(() =>
  import('./sign-in/sign-in.component')
);

const SignUp = lazy(() =>
  import('./sign-up/sign-up.component')
);

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Switch>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Dimmer active inverted>
                <Loader size='massive'>Loading</Loader>
              </Dimmer>
            }
          >
            <Route path='/' exact={true} 
              render={() =>
                currentUser ? (
                  <ChatPage />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route path="/login" exact={true}
              render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route path="/register" exact={true}
              render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignUp />
                )
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
