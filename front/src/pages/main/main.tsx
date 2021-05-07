// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

// antd
import { Col, Row } from 'antd';

// redux
import Categories from './category/categories';
import { AppState } from '../../store';

// custom
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';
import Loading from '../../components/loading/loading';
import Ebooks from './ebooks/ebooks';

// css
import "./main.less";

// components

function Main() {
  const categoryLoading = useSelector((state: AppState) => state.categories.isLoading);
  const ebooksLoading = useSelector((state: AppState) => state.ebooks.isLoading);
  const isLoading = categoryLoading || ebooksLoading;
  return (
    <Row className="main">
      <Col className="main__sidebar">
        <Sidebar />
      </Col>
      <Col className="main__content">
        <Loading isLoading={isLoading} />
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
