import React, { useState } from 'react';

// antd
import { Button, Col, Row } from 'antd';
import { UserAddOutlined, SolutionOutlined } from '@ant-design/icons';

// css
import './navbar.less';
import Credentials, { CredentialsType } from '../modals/credentials';

function Navbar() {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CredentialsType>(CredentialsType.LOGIN);

  const onButtonClick = (type: CredentialsType) => {
    setModalType(type);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
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
          <Button onClick={() => onButtonClick(CredentialsType.LOGIN)} ghost className="navbar__right-btn" icon={<UserAddOutlined />}>Zaloguj się</Button>
          <Button onClick={() => onButtonClick(CredentialsType.REGISTER)} ghost className="navbar__right-btn" icon={<SolutionOutlined />}>Zarejestruj się</Button>
        </Col>
      </Row>
      <Credentials
        onClose={closeModal}
        visible={modalVisible}
        type={modalType} />
    </Row>
  );
}

export default Navbar;
