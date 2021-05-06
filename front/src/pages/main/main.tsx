// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';

// css
import "./main.less";

// components

function Main() {
  return (
    <Switch>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default Main;
