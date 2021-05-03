// core
import React from 'react';
import { useDispatch } from 'react-redux';

// redux
import { openModal } from '../../store/modals/actions';
import { ModalType } from '../../store/modals/types';

// antd
import { Button, Col, Row } from 'antd';

// custom
import LandingParagraph from "../../components/landing-paragraph/landing-paragraph";
import LandingHeading from "../../components/landing-heading/landing-heading";

// images
import Books from "../../img/svg/books.svg";

// css
import "./landing.less";
import Credentials from '../../components/modals/credentials';

// components

function Landing() {
  const dispatch = useDispatch();

  const openRegister = () => {
    dispatch(openModal(ModalType.REGISTER));
  }

  return (
    <div className="ant-layout landing">
      <Row className="landing__content">
        <Col className="landing__coltext" xs={24} lg={12}>
          <LandingHeading className="landing__text landing__h">
            Zacznij nową przygodę z książkami!
          </LandingHeading>
          <LandingParagraph className="landing__text landing__p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aut nostrum porro velit reprehenderit, debitis quasi esse molestias pariatur cumque fugiat quidem asperiores
            in blanditiis quibusdam fuga laudantium tempora atque quis?
          </LandingParagraph>
          <Button onClick={openRegister} className="landing__text landing__btn" size="large" type="primary">Zacznij teraz!</Button>
        </Col>
        <Col className="landing__colimg" xs={24} lg={12}>
          <img height="100%" className="landing__img rounded-img" src={Books} alt="ksiazki" />
        </Col>
      </Row>
      <Credentials />
    </div>
  );
}

export default Landing;
