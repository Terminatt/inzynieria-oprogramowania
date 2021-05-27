// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// antd
import { Col, Row } from 'antd';

// redux
import Categories from './category/categories';

// custom
import MyEbooks from './ebooks/my-ebooks/my-ebooks';
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';
import Ebooks from './ebooks/ebooks';
import Roles from './roles/roles';
import Users from './users/users';

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
          <Route path="/main/roles">
            <Roles />
          </Route>
          <Route path="/main/users">
            <Users />
          </Route>
          <Route path="/main/ebook">
            <Ebooks />
          </Route>
          <Route path="/main/my-ebook">
            <MyEbooks />
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
