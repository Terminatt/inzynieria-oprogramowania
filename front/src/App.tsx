// core
import React from 'react';
import { Route, Switch } from "react-router-dom";

// css
import './App.less';
import 'antd/dist/antd.less';

// components
import Navbar from './components/navbar/navbar';

// pages 
import Landing from './pages/landing/landing';
import Main from './pages/main/main';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
