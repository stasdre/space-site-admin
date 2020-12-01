import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthorized } from '../../modules/Auth';

class PrivateRoute extends PureComponent {
  render() {
    const { component, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }

  renderRoute = (props) => {
    const { component: Component, isAuthorized } = this.props;

    return isAuthorized ? <Component {...props} /> : <Redirect to="/login" />;
  };
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorized(state),
  }),
  null
)(PrivateRoute);
