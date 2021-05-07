// core
import React from 'react';
import Sider from 'antd/lib/layout/Sider';

// antd
import { Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, PaperClipOutlined } from '@ant-design/icons';


// css
import "./sidebar.less";
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
// components

function Sidebar() {

  const user = useSelector((state: AppState) => state.user.user);

  return (
    <Sider className="sidebar">
      <Row>
        <Menu className="sidebar__menu" theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/main">
              Dashboard
        </Link>
          </Menu.Item>
          <Menu.Item icon={<PaperClipOutlined />}>
            <Link to="/main/category">
              Dodaj kategorię
        </Link>
          </Menu.Item>
          <Menu.Item icon={<BookOutlined />}>
            <Link to="/main/ebook">
              Dodaj Ebooka
        </Link>
          </Menu.Item>
        </Menu>

      </Row>
    </Sider>
  );
}

export default Sidebar;
