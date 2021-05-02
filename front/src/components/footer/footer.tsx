import React from 'react';

// antd
import { Row } from 'antd';


// css
import './footer.less';


function Footer() {


  return (
    <Row className="footer" justify="center">
      &copy; Copyright {new Date().getFullYear()}, Projekt Nazwa Robocza Dev Team
    </Row>
  );
}

export default Footer;
