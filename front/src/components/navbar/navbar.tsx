// core
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { ModalType } from '../../store/modals/types';
import { openModal } from "../../store/modals/actions";

// antd
import { Button, Col, Row } from 'antd';
import { UserAddOutlined, SolutionOutlined } from '@ant-design/icons';

// utils
import Utils from '../../utils/utls';
import { ResponsiveBreakpoint } from '../../utils/utils-types';

// css
import './navbar.less';
import { AppState } from '../../store';

function Navbar() {
  const bp = Utils.getResponsiveBreakpoint();
  const size = bp === ResponsiveBreakpoint.XS ? "small" : "middle";

  const token = useSelector((state: AppState) => state.user.token);
  const dispatch = useDispatch();

  const onButtonClick = (type: ModalType) => {
    dispatch(openModal(type));
  }


  return (
    <Row className="navbar">
      <Row className="navbar__content">
        <Col span={12} className="navbar__colbrand navbar__flex">
          <div className="navbar__brand">
            <h1>Ebook App</h1>
          </div>
        </Col>
        <Col span={12} className="navbar__flex navbar__collogin">

          {
            !token ? (
              <>
                {bp === ResponsiveBreakpoint.XXS ? (
                  <>
                    <Button shape="circle" onClick={() => onButtonClick(ModalType.LOGIN)} ghost className="navbar__right-btn" icon={<UserAddOutlined />}></Button>
                    <Button shape="circle" onClick={() => onButtonClick(ModalType.REGISTER)} ghost className="navbar__right-btn" icon={<SolutionOutlined />}></Button>
                  </>
                ) : (
                  <>
                    <Button size={size} onClick={() => onButtonClick(ModalType.LOGIN)} ghost className="navbar__right-btn" icon={<UserAddOutlined />}>Zaloguj się</Button>
                    <Button size={size} onClick={() => onButtonClick(ModalType.REGISTER)} ghost className="navbar__right-btn" icon={<SolutionOutlined />}>Zarejestruj się</Button>
                  </>
                )}
              </>
            ) : null
          }
        </Col>
      </Row>
    </Row>
  );
}

export default Navbar;
