// core
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// addons
import { Scrollbars } from 'react-custom-scrollbars-2';

// redux
import { addOrCreatePermission, getPermissionTypes, getRolesCollection, selectRole } from '../../../store/roles/actions';

import { AppState } from '../../../store';
import { Role } from '../../../store/user/types';

// antd
import { Button, Col, Row } from 'antd';
import { UserOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

// custom
import Loading from '../../../components/loading/loading';

// utils
import Utils from '../../../utils/utls';

// css
import "./roles.less";
import { Permission } from '../../../store/roles/types';

// components

function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state: AppState) => state.roles);
  const { isLoading, selected, permissionTypes } = roles;

  const [permissions, setPermissions] = useState<{ [key: string]: string[] }>({})

  useEffect(() => {
    dispatch(getRolesCollection());
    dispatch(getPermissionTypes())
  }, [dispatch])

  const onSelectRole = (role: Role) => {
    if (selected?._id === role._id) {
      dispatch(selectRole(null))
    } else {
      dispatch(selectRole(role))
    }
  }

  const prepareDataForSending = () => {
    const data: Partial<Permission>[] = []

    if (!selected) {
      return;
    }

    for (const [key, value] of Object.entries(permissions)) {
      data.push({ entityName: key, role: selected._id, permissions: value })
    }

    return data;
  }

  const savePermissions = () => {
    const data = prepareDataForSending();
    if (data) {
      dispatch(addOrCreatePermission(data))
    }
  }

  const renderRoles = () => {
    return roles.collection.map((el) => (
      <Row onClick={() => onSelectRole(el)} className={["roles__role", selected?._id === el._id ? "roles__role--active" : ""].join(" ")} key={el._id}>
        <div>
          <UserOutlined />
        </div>
        <div>
          {el.name}
        </div>
      </Row>
    ))
  }

  const onCheckboxChange = (checked: boolean, perm: string, entity: string) => {
    const permissionsCopy = Utils.deepClone(permissions);
    if (!Array.isArray(permissionsCopy[entity])) {
      permissionsCopy[entity] = []
    }

    if (checked) {
      permissionsCopy[entity].push(perm)
    } else {
      permissionsCopy[entity] = permissionsCopy[entity].filter((el: string) => el !== perm)
    }
    setPermissions(permissionsCopy);
  }

  const renderPermissions = () => {
    const permissionRows: React.ReactNode[] = [];
    if (permissionTypes) {
      for (const [key, value] of Object.entries(permissionTypes)) {
        permissionRows.push((
          <Col key={key} className="roles__permission" xs={24}>
            <Row className="roles__header">
              <h3>{key}</h3>
            </Row>
            <Row className="roles__checkboxes">
              {value.map((perm: string) => (
                <Checkbox onChange={(checked) => onCheckboxChange(checked.target.checked, perm, key)} key={perm}>{Utils.initCap(perm)}</Checkbox>
              ))}
            </Row>
          </Col>
        ))
      }
    }

    return permissionRows;
  }

  const deleteDisabled = !selected || !selected.deletable;

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="roles">
        <Col xs={6} className="roles__board">
          <Row className="roles__header">
            <Col xs={12}>
              <h2>Role ({roles.collection.length !== 0 ? roles.collection.length : null})</h2>
            </Col>
            <Col className="roles__add" xs={12}>
              <Button className="roles__btn" icon={<PlusCircleOutlined />} size="small" type="primary">Dodaj</Button>
              <Button disabled={deleteDisabled} className="roles__btn btn--delete" icon={<DeleteOutlined />} size="small" type="primary">Usuń</Button>
            </Col>
          </Row>
          <Scrollbars className="scrollbar" style={{ height: "calc(100% - 50px)" }}>
            {renderRoles()}
          </Scrollbars>
        </Col>
        <Col xs={18} className="roles__board scroll-container">
          <Row className="roles__header">
            <h2>Pozwolenia</h2>
          </Row>
          <Scrollbars className="scrollbar" style={{ height: "calc(100% - 100px)" }}>
            {selected ? renderPermissions() : null}
          </Scrollbars>
          <Row>
            <Col xs={24} className="roles__edit">
              <Button onClick={savePermissions} className="roles__btn" icon={<PlusCircleOutlined />} type="primary">Zapisz</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Roles;
