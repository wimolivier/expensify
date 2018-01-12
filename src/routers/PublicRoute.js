import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,                          // rename lowercase 'component' that is passed in to uppercase to conform to Component naming conventions
  ...rest                                        // In using ... when DESTRUCTURING, this way we get access to all the 'other' remaining stuff we can then pass down (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
}) => (                                          // ...rest will contain everything, except 'isAuthenticated' and 'component'
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid           // flip to boolean, because we'll get the user's uid if auth'ed, else 'undefined'
});

export default connect(mapStateToProps)(PublicRoute);