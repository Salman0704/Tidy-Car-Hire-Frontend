import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
// import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                Luxury Car Rentals at Affordable Prices
                </h2>

                <p className="section__description">
                Driving a supercar is everyone's dream, but the price tag puts this dream out of reach for many. Fret no more, as Tidy Luxury Car Reantal makes getting in the driver's seat of your favourite vehicle an affordable possibility.
                </p>

                <p className="section__description">
                Established to help you "Drive Your Dream", Tidy Luxury Car Rental is available for special occasions, corporate events, or even just creating a once-in-a-lifetime driving experience.
                </p>

                <p className="section_description">
                  For those who need more, we provide chauffering, close protection, and accident and claims management services.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+443333555553</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <BecomeDriverSection /> */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              {/* <h6 className="section__subtitle">Experts</h6> */}
              <h2 className="section__title">Our Cars</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
