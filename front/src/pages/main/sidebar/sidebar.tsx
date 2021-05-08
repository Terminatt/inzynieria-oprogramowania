// core
import React from 'react';
import Sider from 'antd/lib/layout/Sider';

// antd
import { Menu, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, BookOutlined, PaperClipOutlined } from '@ant-design/icons';


// css
import "./sidebar.less";
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
// components

function Sidebar() {

  const user = useSelector((state: AppState) => state.user.user);
  const { pathname } = useLocation();


  return (
    <Sider className="sidebar">
      <Row>
        <Menu selectedKeys={[pathname]} className="sidebar__menu" theme="dark">
          <Menu.Item key="/main" icon={<HomeOutlined />}>
            <Link to="/main">
              Dashboard
        </Link>
          </Menu.Item>
          <Menu.Item key="/main/category" icon={<PaperClipOutlined />}>
            <Link to="/main/category">
              Kategorie
        </Link>
          </Menu.Item>
          <Menu.Item key="/main/ebook" icon={<BookOutlined />}>
            <Link to="/main/ebook">
              Ebooki
        </Link>
          </Menu.Item>
        </Menu>

      </Row>
    </Sider>
  );
}

export default Sidebar;
