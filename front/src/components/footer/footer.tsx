import React from 'react';

// antd
import { Row } from 'antd';


// css
import './footer.less';


function Footer() {


  return (
    <Row className="custom-footer" justify="center">
      <span>
        &copy; Copyright {new Date().getFullYear()},&nbsp;
      </span>
      <span>Projekt Nazwa Robocza Dev Team</span>
    </Row>
  );
}

export default Footer;
