// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// custom
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';

// css
import "./main.less";
import { Col, Row } from 'antd';
import Categories from './category/categories';

// components

function Main() {
  return (
    <Row className="main">
      <Col className="main__sidebar">
        <Sidebar />
      </Col>
      <Col className="main__content">
        <Switch>
          <Route path="/main/category">
            <Categories />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}

export default Main;
