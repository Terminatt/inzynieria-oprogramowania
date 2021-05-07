// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// redux
import Categories from './category/categories';
import { AppState } from '../../store';

// custom
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';
import Loading from '../../components/loading/loading';

// css
import "./main.less";
import { Col, Row } from 'antd';

// components

function Main() {
  const categoryLoading = useSelector((state: AppState) => state.categories.isLoading);
  const isLoading = categoryLoading;
  return (
    <Row className="main">
      <Col className="main__sidebar">
        <Sidebar />
      </Col>
      <Col className="main__content">
        <Loading isLoading={isLoading} />
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
