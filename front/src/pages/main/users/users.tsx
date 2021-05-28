// core
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { AppState } from '../../../store';
import { getUsersCollection } from '../../../store/user/actions';

// antd
import { Col, Row } from 'antd';

// css
import "./users.less";
import Loading from '../../../components/loading/loading';
import Scrollbars from 'react-custom-scrollbars-2';

// components

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user)
  const { isLoading } = users;

  useEffect(() => {
    dispatch(getUsersCollection())
  }, [dispatch])

  return (
    <Row className="scroll-container">
      <Loading isLoading={isLoading} />
      <Row className="roles">
        <Col xs={24} className="roles__board scroll-container">
          <Row className="roles__header">
            <h2>Użytkownicy</h2>
          </Row>
          <Scrollbars className="scrollbar" style={{ height: "calc(100% - 100px)" }}>
          </Scrollbars>
          <Row>
            <Col xs={24} className="roles__edit">
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Users;
