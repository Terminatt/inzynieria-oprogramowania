// core
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// addons
import { Scrollbars } from 'react-custom-scrollbars-2';

// redux
import { addOrCreatePermission, getPermissionForRole, getPermissionTypes, getRolesCollection, selectRole, } from '../../../store/roles/actions';
import { Permission } from '../../../store/roles/types';

import { AppState } from '../../../store';
import { Role } from '../../../store/user/types';

// antd
import { Button, Col, notification, Row, Tooltip } from 'antd';
import { UserOutlined, PlusCircleOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

// custom
import Loading from '../../../components/loading/loading';
import CustomCheckbox from '../../../components/checkbox/checkbox';

// utils
import Utils from '../../../utils/utls';

// css
import "./roles.less";

// components

function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state: AppState) => state.roles);
  const { isLoading, selected, permissionTypes, permissionsCollection } = roles;

  const [permissions, setPermissions] = useState<{ [key: string]: string[] }>({})

  useEffect(() => {
    dispatch(getRolesCollection())
    dispatch(getPermissionTypes())
  }, [dispatch])

  const onSelectRole = (role: Role) => {
    if (selected?._id === role._id) {
      dispatch(selectRole(null))
    } else {
      dispatch(selectRole(role))
      dispatch(getPermissionForRole(role._id))
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
      dispatch(addOrCreatePermission(data, () => {
        notification.success({ message: "Pomyślnie zaktualizowano role" })
      }))
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
        <div className="roles__icon">
          {!el.deletable ? <Tooltip overlay="Tej roli nie można usunąć" ><span className="red"><StopOutlined /></span></Tooltip> : null}
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

  const checkIfChecked = (entity: string, perm: string) => {
    const entityPerms = permissionsCollection.find((el) => el.entityName === entity);

    if (!entityPerms) {
      return false;
    }

    return entityPerms.permissions.includes(perm);
  }

  const renderPermissions = () => {
    const permissionRows: React.ReactNode[] = [];
    if (permissionTypes) {
      for (const [key, value] of Object.entries(permissionTypes)) {
        permissionRows.push((
          <Col key={selected?._id + key} className="roles__permission" xs={24}>
            <Row className="roles__header">
              <h3>{key}</h3>
            </Row>
            <Row className="roles__checkboxes">
              {value.map((perm: string) => (
                <CustomCheckbox initialChecked={checkIfChecked(key, perm)} onCheckboxChange={(checked) => onCheckboxChange(checked, perm, key)} key={perm + selected?._id}>{Utils.initCap(perm)}</CustomCheckbox>
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
