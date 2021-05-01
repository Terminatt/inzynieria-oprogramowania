// core
import React from 'react';

// antd
import { Col, Layout, Row } from 'antd';

// custom
import LandingParagraph from "../../components/landing-paragraph/landing-paragraph";
import LandingHeading from "../../components/landing-heading/landing-heading";

// images
import Books from "../../img/svg/books.svg";

// css
import "./landing.less";

// components

function Landing() {
  return (
    <Layout className="landing">
      <Row className="landing__content">
        <Col lg={12}>
          <LandingHeading className="landing__text">
            Zacznij nową przygodę z książkami!
          </LandingHeading>
          <LandingParagraph className="landing__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aut nostrum porro velit reprehenderit, debitis quasi esse molestias pariatur cumque fugiat quidem asperiores
            in blanditiis quibusdam fuga laudantium tempora atque quis?
          </LandingParagraph>
        </Col>
        <Col lg={12}>
          <img className="rounded-img" src={Books} alt="ksiazki" />
        </Col>
      </Row>
    </Layout>
  );
}

export default Landing;
