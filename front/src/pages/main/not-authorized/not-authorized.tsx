// core
import { Col, Row } from 'antd';
import React from 'react';

import { StopOutlined } from '@ant-design/icons';

import './not-authorized.less'

function NotAuthorized() {

  return (
    <Row className="scroll-container">
      <Col className="not-authorized" xs={24}>
        <div>
          <h1>Brak autoryzacji aby zobaczyć tą podstronę</h1>
          <div style={{ textAlign: 'center', marginTop: '24px' }}><StopOutlined style={{ fontSize: '120px' }} className="red" /></div>
        </div>
      </Col>
    </Row>
  );
}

export default NotAuthorized;
