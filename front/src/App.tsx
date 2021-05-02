// core
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

// css
import './App.less';
import 'antd/dist/antd.less';

// components
import Navbar from './components/navbar/navbar';

// pages 
import Landing from './pages/landing/landing';
import Main from './pages/main/main';

// utils
import Utils from './utils/utls';
import { isAuth } from './store/user/actions';
import Footer from './components/footer/footer';
import { Layout } from 'antd';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = Utils.getToken();

    if (token) {
      dispatch(isAuth(token, () => {
        history.push("/main");
      }))
    }

  }, [dispatch, history])
  return (
    <main className="app">
      <Layout className="app__content">
        <Navbar />
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
        <Footer />
      </Layout>
    </main>
  );
}

export default App;
