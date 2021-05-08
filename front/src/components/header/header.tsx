import React from 'react';

// antd
import { Row } from 'antd';


// css
import './header.less';


interface ComponentProps {
  children: React.ReactNode;
}

function Header(props: ComponentProps) {
  return (
    <Row className="header">
      <div className="header__content">
        <h2>{props.children}</h2>
      </div>
    </Row>
  );
}

export default Header;
