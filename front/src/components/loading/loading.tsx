// core
import React from 'react';

// antd
import { LoadingOutlined } from '@ant-design/icons';
// css
import "./loading.less";



interface ComponentProps {
  isLoading: boolean
}

function Loading(props: ComponentProps) {
  return (
    <>
      {props.isLoading ? (
        <>
          <div className="loading-bg">
          </div>
          <div className="loading">
            <LoadingOutlined className="loading__icon" />
          </div>
        </>

      ) : null}
    </>
  );
}

export default Loading;
