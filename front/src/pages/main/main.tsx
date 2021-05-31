// core
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// antd
import { Col, Row } from 'antd';

// redux
import Categories from './category/categories';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

// custom
import MyEbooks from './ebooks/my-ebooks/my-ebooks';
import Dashboard from './dashboard/dashboard';
import Sidebar from './sidebar/sidebar';
import Ebooks from './ebooks/ebooks';
import Roles from './roles/roles';
import Users from './users/users';
import Review from './review/review';
import NotAuthorized from './not-authorized/not-authorized';

// css
import "./main.less";

// components

function Main() {
  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const category = permissions.find((el) => el.entityName === 'Category');
  const ebook = permissions.find((el) => el.entityName === 'Ebook');
  const library = permissions.find((el) => el.entityName === 'Library');
  const roles = permissions.find((el) => el.entityName === 'Role');
  const user = permissions.find((el) => el.entityName === 'User');
  const review = permissions.find((el) => el.entityName === 'Review');

  const displayCategories = !!category?.permissions.includes('DISPLAY');
  const displayEbooks = !!ebook?.permissions.includes('DISPLAY');
  const displayLibrary = !!library?.permissions.includes('DISPLAY');
  const displayRoles = !!roles?.permissions.includes('DISPLAY');
  const displayUser = !!user?.permissions.includes('DISPLAY');
  const displayReview = !!review?.permissions.includes('DISPLAY');

  const notAuthorized = (component: React.ReactElement, authorized: boolean) => {
    return userState.user?.role.superAdmin || authorized ? component : <NotAuthorized />
  }

  return (
    <Row className="main">
      <Col className="main__sidebar">
        <Sidebar />
      </Col>
      <Col className="main__content">
        <Switch>
          <Route path="/main/roles">
            {notAuthorized(<Roles />, displayRoles)}
          </Route>
          <Route path="/main/users">
            {notAuthorized(<Users />, displayUser)}
          </Route>
          <Route path="/main/ebook/:id">
            {notAuthorized(<Review />, displayReview)}
          </Route>
          <Route path="/main/ebook">
            {notAuthorized(<Ebooks />, displayEbooks)}
          </Route>
          <Route path="/main/my-ebook">
            {notAuthorized(<MyEbooks />, displayLibrary)}
            <MyEbooks />
          </Route>
          <Route path="/main/category">
            {notAuthorized(<Categories />, displayCategories)}
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
