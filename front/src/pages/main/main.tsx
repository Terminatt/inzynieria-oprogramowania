// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// antd
import { Col, Row } from 'antd';

// redux
import Categories from './category/categories';

// custom
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';
import Ebooks from './ebooks/ebooks';

// css
import "./main.less";

// components

function Main() {
  return (
    <Row className="main">
      <Col className="main__sidebar">
        <Sidebar />
      </Col>
      <Col className="main__content">
        <Switch>
          <Route path="/main/ebook">
            <Ebooks />
          </Route>
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
