// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// addons
import { Scrollbars } from 'react-custom-scrollbars-2';

// redux
import { getRolesCollection } from '../../../store/roles/actions';

// antd
import { Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// custom
import Loading from '../../../components/loading/loading';

// css
import "./roles.less";
import { AppState } from '../../../store';

// components

function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state: AppState) => state.roles);
  const { isLoading } = roles;

  useEffect(() => {
    dispatch(getRolesCollection());
  }, [dispatch])

  const renderRoles = () => {
    return roles.collection.map((el) => (
      <>
        <Row className="roles__role" key={el._id}>
          <div>
            <UserOutlined />
          </div>
          <div>
            {el.name}
          </div>
        </Row>
      </>
    ))
  }

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="roles">
        <Col xs={4} className="roles__board">
          <Row className="roles__header">
            <h2>User Roles ({roles.collection.length !== 0 ? roles.collection.length : null})</h2>
          </Row>
          <Scrollbars autoHeight>
            {renderRoles()}
          </Scrollbars>
        </Col>
        <Col xs={20} className="roles__board">
        </Col>
      </Row>
    </Row>
  );
}

export default Roles;
