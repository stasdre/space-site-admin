import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';

const Login = lazy(() => import('../Login/Login'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));

const Router = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </Suspense>
  );
};

export default Router;
