// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { AppState } from '../../../store';
import { deleteUser, getUsersCollection, updateRole } from '../../../store/user/actions';
import { Role, User } from '../../../store/user/types';
import { getRolesCollection } from '../../../store/roles/actions';

// antd
import { Button, Col, Row, Select, Table } from 'antd';
import { BoldOutlined, DeleteOutlined } from '@ant-design/icons';

// custom
import Loading from '../../../components/loading/loading';

// css
import "./users.less";
import { Id } from '../../../store/base/BaseEntity';

// components


const { Option } = Select;


function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user)
  const roles = useSelector((state: AppState) => state.roles)

  const isLoadingUser = users.isLoading;
  const isLoadingRoles = roles.isLoading;

  const isLoading = isLoadingUser || isLoadingRoles;

  const changeRole = (id: Id, role: Id, payload: User) => {
    dispatch(updateRole(id, role, payload, () => {
      dispatch(getUsersCollection());
    }))
  }

  const deleteSelected = (id: Id) => {
    dispatch(deleteUser(id, () => {
      dispatch(getUsersCollection());
    }));
  }

  const userState = useSelector((state: AppState) => state.user);
  const { permissions } = userState;

  const user = permissions.find((el) => el.entityName === 'User');

  const columns = [
    {
      title: 'Imie',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text,
    },
    {
      title: 'Płeć',
      dataIndex: 'sex',
      key: 'sex',
      render: (text: string) => text,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => text,
    },
    {
      title: 'Rola',
      dataIndex: 'role',
      key: 'role',
      render: (data: Role, row: User) => (
        <Row>
          <Col xs={24}>
            <Select onChange={(value) => changeRole(row._id, value, row)} style={{ width: '100%' }} defaultValue={data._id} showSearch>
              {roles.collection.map((el) => (
                <Option key={el._id} value={el._id}>{el.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      )
    },
    {
      title: 'Akcje',
      dataIndex: 'deletable',
      key: 'deletable',
      render: (data: any, row: User) => (
        <Row>
          <Button disabled={!userState.user?.role.superAdmin && !user?.permissions.includes("BAN")} icon={<BoldOutlined />} className="user-action btn-warning" size="small">
            Zbanuj
          </Button>
          <Button type="primary" onClick={() => deleteSelected(row._id)} icon={<DeleteOutlined />} className="user-action btn-delete" disabled={row.role.superAdmin || (!userState.user?.role.superAdmin && !user?.permissions.includes("DELETE"))} size="small">
            Usuń
          </Button>
        </Row>
      ),
    }
  ];

  useEffect(() => {
    dispatch(getUsersCollection())
    dispatch(getRolesCollection())
  }, [dispatch])

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="roles">
        <Col xs={24} className="roles__board users scroll-container">
          <Row className="roles__header">
            <h2>Użytkownicy</h2>
          </Row>
          <Row>
            <Table
              style={{ height: "100%" }}
              scroll={{ y: "calc(100% - 50px)" }}
              bordered
              columns={columns}
              dataSource={users.userCollection} />
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Users;
