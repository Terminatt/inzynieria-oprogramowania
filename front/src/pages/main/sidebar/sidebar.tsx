// core
import React from 'react';
import Sider from 'antd/lib/layout/Sider';

// antd
import { Menu, Row } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, BookOutlined, PaperClipOutlined, ContainerOutlined, TeamOutlined, OneToOneOutlined, UserOutlined } from '@ant-design/icons';

// css
import "./sidebar.less";
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

function Sidebar() {
  const { pathname } = useLocation();

  const userState = useSelector((state: AppState) => state.user);

  return (
    <Sider className="sidebar">
      <Row>
        <Menu defaultOpenKeys={['user', 'admin']} mode="inline" selectedKeys={[pathname]} className="sidebar__menu" theme="dark">
          {userState.user?.role.superAdmin ? (
            <Menu.SubMenu icon={<ContainerOutlined />} className="sidebar__submenu" key="user" title="Workspace">
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
            </Menu.SubMenu>
          ) : null}
          {userState.user?.role.superAdmin ? (
            <Menu.SubMenu icon={<TeamOutlined />} className="sidebar__submenu" key="admin" title="Administracja">
              <Menu.Item key="/main/roles" icon={<OneToOneOutlined />}>
                <Link to="/main/roles">
                  Role
              </Link>
              </Menu.Item>
              <Menu.Item key="/main/users" icon={<UserOutlined />}>
                <Link to="/main/users">
                  Użytkownicy
              </Link>
              </Menu.Item>
            </Menu.SubMenu>
          ) : null}
        </Menu>
      </Row>
    </Sider>
  );
}

export default Sidebar;
