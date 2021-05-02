// core
import React from 'react';
import { useDispatch } from 'react-redux';

// redux
import { ModalType } from '../../store/modals/types';
import { openModal } from "../../store/modals/actions";

// antd
import { Button, Col, Row } from 'antd';
import { UserAddOutlined, SolutionOutlined } from '@ant-design/icons';

// css
import './navbar.less';

function Navbar() {

  const dispatch = useDispatch();

  const onButtonClick = (type: ModalType) => {
    dispatch(openModal(type));
  }


  return (
    <Row className="navbar">
      <Row className="navbar__content">
        <Col className="navbar__flex" span={12}>
          <div className="brand">
            <h1>Ebook App</h1>
          </div>
        </Col>
        <Col className="navbar__flex navbar__right" span={12}>
          <Button onClick={() => onButtonClick(ModalType.LOGIN)} ghost className="navbar__right-btn" icon={<UserAddOutlined />}>Zaloguj się</Button>
          <Button onClick={() => onButtonClick(ModalType.REGISTER)} ghost className="navbar__right-btn" icon={<SolutionOutlined />}>Zarejestruj się</Button>
        </Col>
      </Row>
    </Row>
  );
}

export default Navbar;
