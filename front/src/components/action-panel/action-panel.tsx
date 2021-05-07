// core
import React from 'react';

//antd
import { Row } from 'antd';

// css
import "./action-panel.less";



interface ComponentProps {
  children: React.ReactNode;
}

function ActionPanel(props: ComponentProps) {
  return (
    <Row className="action-panel" justify="end">
      {props.children}
    </Row>
  );
}

export default ActionPanel;
