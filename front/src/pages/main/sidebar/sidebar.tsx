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
  const { permissions } = userState;

  const category = permissions.find((el) => el.entityName === 'Category');
  const ebook = permissions.find((el) => el.entityName === 'Ebook');
  const library = permissions.find((el) => el.entityName === 'Library');
  const roles = permissions.find((el) => el.entityName === 'Role');
  const user = permissions.find((el) => el.entityName === 'User');

  const displayCategories = !!category?.permissions.includes('DISPLAY');
  const displayEbooks = !!ebook?.permissions.includes('DISPLAY');
  const displayLibrary = !!library?.permissions.includes('DISPLAY');
  const displayRoles = !!roles?.permissions.includes('DISPLAY');
  const displayUser = !!user?.permissions.includes('DISPLAY');

  return (
    <Sider className="sidebar">
      <Row>
        <Menu defaultOpenKeys={['main', 'user', 'admin']} mode="inline" selectedKeys={[pathname]} className="sidebar__menu" theme="dark">
          {userState.user?.role.superAdmin || displayCategories || displayEbooks ? (
            <Menu.SubMenu icon={<ContainerOutlined />} className="sidebar__submenu" key="main" title="Ogólne">
              <Menu.Item key="/main" icon={<HomeOutlined />}>
                <Link to="/main">
                  Dashboard
              </Link>
              </Menu.Item>
              {userState.user?.role.superAdmin || displayCategories ? (
                <Menu.Item key="/main/category" icon={<PaperClipOutlined />}>
                  <Link to="/main/category">
                    Kategorie
              </Link>
                </Menu.Item>

              ) : null}
              {userState.user?.role.superAdmin || displayEbooks ? (
                <Menu.Item key="/main/ebook" icon={<BookOutlined />}>
                  <Link to="/main/ebook">
                    Ebooki
              </Link>
                </Menu.Item>

              ) : null}
            </Menu.SubMenu>
          ) : null}
          {userState.user?.role.superAdmin || displayLibrary ? (
            <Menu.SubMenu icon={<ContainerOutlined />} className="sidebar__submenu" key="user" title="Twoja strefa">
              <Menu.Item key="/main/my-ebook" icon={<BookOutlined />}>
                <Link to="/main/my-ebook">
                  Moje Ebooki
              </Link>
              </Menu.Item>
            </Menu.SubMenu>
          ) : null}
          {userState.user?.role.superAdmin || displayRoles || displayUser ? (
            <Menu.SubMenu icon={<TeamOutlined />} className="sidebar__submenu" key="admin" title="Administracja">
              {userState.user?.role.superAdmin || displayRoles ? (
                <Menu.Item key="/main/roles" icon={<OneToOneOutlined />}>
                  <Link to="/main/roles">
                    Role
              </Link>
                </Menu.Item>

              ) : null}

              {userState.user?.role.superAdmin || displayUser ? (
                <Menu.Item key="/main/users" icon={<UserOutlined />}>
                  <Link to="/main/users">
                    Użytkownicy
              </Link>
                </Menu.Item>
              ) : null}
            </Menu.SubMenu>
          ) : null}
        </Menu>
      </Row>
    </Sider>
  );
}

export default Sidebar;
