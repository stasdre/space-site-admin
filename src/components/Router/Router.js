import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';
import { Dashboard } from '../Dashboard';
import { Login } from '../Login';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
};

export default Router;
